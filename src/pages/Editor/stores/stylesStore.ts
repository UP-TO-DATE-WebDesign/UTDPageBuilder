import { create } from "zustand";
import type { Editor as GrapesEditor } from "grapesjs";

export interface StylePropertyInfo {
  id: string;
  label: string;
  value: string;
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
  toggleSector: (sectorId: string) => void;
  addClass: (name: string) => void;
  removeClass: (id: string) => void;
  setState: (value: string) => void;
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
        properties: sector.getProperties().map((property) => ({
          id: property.getId(),
          label: property.getLabel(),
          value: String(property.getValue() ?? ""),
        })),
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
}));
