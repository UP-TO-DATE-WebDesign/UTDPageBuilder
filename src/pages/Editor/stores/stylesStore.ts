import { create } from "zustand";
import type {
  Editor as GrapesEditor,
  Property,
  PropertyComposite,
  PropertyNumber,
} from "grapesjs";

export interface StylePropertyInfo {
  id: string;
  label: string;
  value: string;
  // Present (and value on the parent meaningless) for "composite" properties
  // like padding/margin, which store their state in sub-properties rather
  // than a single value - see PropertyComposite in grapesjs.
  properties?: StylePropertyInfo[];
}

export interface StyleSectorInfo {
  id: string;
  name: string;
  open: boolean;
  properties: StylePropertyInfo[];
}

export interface SelectorInfo {
  id: string;
  label: string;
}

export interface EnsurePropertyDefinition {
  // Matches the "property"/id used to register it with the style manager -
  // also what findProperty(sectors, [id]) should be called with afterwards.
  id: string;
  label: string;
  type?: string;
  default: string;
  options: { id: string; label: string }[];
}

interface StylesStoreState {
  editor: GrapesEditor | null;
  sectors: StyleSectorInfo[];
  selectedName: string | null;
  classes: SelectorInfo[];
  states: SelectorInfo[];
  currentState: string;
  setEditor: (editor: GrapesEditor) => void;
  refreshStyles: () => void;
  setPropertyValue: (sectorId: string, propertyId: string, value: string) => void;
  setSubPropertyValue: (
    sectorId: string,
    propertyId: string,
    subPropertyId: string,
    value: string,
  ) => void;
  toggleSector: (sectorId: string) => void;
  addClass: (name: string) => void;
  removeClass: (id: string) => void;
  setState: (value: string) => void;
  ensureProperty: (definition: EnsurePropertyDefinition) => void;
}

// grapesjs's own style manager registers both "number" and "integer" typed
// properties as the same PropertyNumber class (see its Properties.types
// config: both map to `model: PropertyNumber`) - but getType() returns
// whichever literal string the property was created with, never normalized
// to one or the other. The reference data (data/site-editor-property-
// reference/) uses "integer" (ported from the old project's GrapesJS 0.16
// config), so both need to be treated as number-typed here.
function isNumberPropertyType(type: string): boolean {
  return type === "number" || type === "integer";
}

function buildPropertyInfo(property: Property): StylePropertyInfo {
  // Number-typed properties (width, height, ...) store the unit separately
  // from the value - getValue() returns just the bare number, so the unit
  // has to be read via getFullValue() (e.g. "100px") or it's lost entirely.
  const value = isNumberPropertyType(property.getType())
    ? (property as PropertyNumber).getFullValue()
    : property.getValue();

  const info: StylePropertyInfo = {
    id: property.getId(),
    label: property.getLabel(),
    value: String(value ?? ""),
  };

  if (property.getType() === "composite") {
    info.properties = (property as PropertyComposite)
      .getProperties()
      .map(buildPropertyInfo);
  }

  return info;
}

export const useStylesStore = create<StylesStoreState>((set, get) => ({
  editor: null,
  sectors: [],
  selectedName: null,
  classes: [],
  states: [],
  currentState: "",

  setEditor: (editor) => {
    set({ editor });
    get().refreshStyles();

    const refresh = () => get().refreshStyles();
    editor.on("style:target", refresh);
    editor.on("style:property:update", refresh);
    editor.on("style:sector:update", refresh);
    editor.on("selector", refresh);
  },

  refreshStyles: () => {
    const { editor } = get();
    if (!editor) return;

    const sectors = editor.StyleManager.getSectors({ visible: true }).map(
      (sector) => ({
        id: sector.getId(),
        name: sector.getName(),
        open: sector.isOpen(),
        properties: sector.getProperties().map(buildPropertyInfo),
      }),
    );

    const classes = editor.Selectors.getSelectedAll().map((selector) => ({
      id: selector.getName(),
      label: selector.getLabel(),
    }));

    const states = editor.Selectors.getStates().map((state) => ({
      id: state.getName(),
      label: state.getLabel(),
    }));

    set({
      sectors,
      selectedName: editor.getSelected()?.getName() ?? null,
      classes,
      states,
      currentState: editor.Selectors.getState(),
    });
  },

  setPropertyValue: (sectorId, propertyId, value) => {
    const { editor } = get();
    if (!editor) return;
    editor.StyleManager.getProperty(sectorId, propertyId)?.upValue(value);
  },

  setSubPropertyValue: (sectorId, propertyId, subPropertyId, value) => {
    const { editor } = get();
    if (!editor) return;
    const property = editor.StyleManager.getProperty(sectorId, propertyId) as
      | PropertyComposite
      | undefined;
    property?.getProperty(subPropertyId)?.upValue(value);
  },

  toggleSector: (sectorId) => {
    const { editor } = get();
    if (!editor) return;
    const sector = editor.StyleManager.getSector(sectorId);
    sector?.setOpen(!sector.isOpen());
    get().refreshStyles();
  },

  addClass: (name) => {
    const { editor } = get();
    if (!editor || !name.trim()) return;
    editor.Selectors.addSelected(name.trim());
    get().refreshStyles();
  },

  removeClass: (id) => {
    const { editor } = get();
    if (!editor) return;
    const selector = editor.Selectors.get(id);
    if (selector) editor.Selectors.removeSelected(selector);
    get().refreshStyles();
  },

  setState: (value) => {
    const { editor } = get();
    if (!editor) return;
    editor.Selectors.setState(value);
    get().refreshStyles();
  },

  // Some properties (e.g. "float") aren't in the Studio SDK's default style
  // manager config, so findProperty(sectors, [id]) always comes back
  // undefined - not just while nothing's selected, but because there's no
  // matching Property model to ever find. Register it once, anchored to
  // whichever sector happens to exist first (addProperty silently no-ops
  // against a sectorId that doesn't exist, so we can't just guess one).
  ensureProperty: (definition) => {
    const { editor, sectors } = get();
    if (!editor) return;

    // id-only match, not label - see findProperty.ts's comment for why:
    // label is decorative UI text the reference data reuses across
    // unrelated properties (e.g. "display" is labeled "Visibility" in one
    // sector), so matching on it here would wrongly treat a genuinely
    // missing property (e.g. "visibility") as already registered.
    const id = definition.id.toLowerCase();
    const alreadyExists = sectors.some((sector) =>
      sector.properties.some((p) => p.id.toLowerCase() === id),
    );
    if (alreadyExists) return;

    const anchorSector = sectors[0];
    if (!anchorSector) return;

    editor.StyleManager.addProperty(anchorSector.id, {
      label: definition.label,
      property: definition.id,
      type: definition.type ?? "select",
      default: definition.default,
      options: definition.options,
    });

    get().refreshStyles();
  },
}));
