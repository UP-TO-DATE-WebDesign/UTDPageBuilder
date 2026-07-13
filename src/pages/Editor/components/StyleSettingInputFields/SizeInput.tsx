import { ChevronsUpDown } from "lucide-react";
import {
  useStylesStore,
  type StyleSectorInfo,
  type StylePropertyInfo,
} from "../../stores/stylesStore";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// The style manager doesn't expose a stable, documented sector layout, so
// rather than hardcoding a sectorId (which a config change could silently
// break) this searches every sector's properties for an id/label match -
// same shape setPropertyValue needs (sectorId + propertyId) either way.
function findProperty(
  sectors: StyleSectorInfo[],
  candidates: string[],
): { sectorId: string; property: StylePropertyInfo } | undefined {
  const wanted = candidates.map((c) => c.toLowerCase());
  for (const sector of sectors) {
    const property = sector.properties.find(
      (p) =>
        wanted.includes(p.id.toLowerCase()) ||
        wanted.includes(p.label.toLowerCase()),
    );
    if (property) return { sectorId: sector.id, property };
  }
  return undefined;
}

// CSS size values are a number glued to a unit (e.g. "100px") - split them
// so the number and unit can be edited independently, then rejoined on
// write. Values like "auto" have no numeric part, so there's nothing to
// split - fall back to the field's default unit for the dropdown to show.
function parseSize(
  value: string,
  defaultUnit: string,
): { number: string; unit: string } {
  const match = /^(-?\d*\.?\d+)([a-z%]*)$/i.exec(value.trim());
  if (!match) return { number: "", unit: defaultUnit };
  return { number: match[1], unit: match[2] || defaultUnit };
}

export default function SizeInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);

  const width = findProperty(sectors, ["width"]);
  const height = findProperty(sectors, ["height"]);

  const widthUnits = ["px", "%", "vw"];
  const heightUnits = ["px", "%", "vh"];

  const widthParsed = parseSize(width?.property.value ?? "", widthUnits[0]);
  const heightParsed = parseSize(height?.property.value ?? "", heightUnits[0]);

  const setWidth = (number: string, unit: string) => {
    if (!width) return;
    setPropertyValue(
      width.sectorId,
      width.property.id,
      number.trim() === "" ? "" : `${number}${unit}`,
    );
  };

  const setHeight = (number: string, unit: string) => {
    if (!height) return;
    setPropertyValue(
      height.sectorId,
      height.property.id,
      number.trim() === "" ? "" : `${number}${unit}`,
    );
  };

  return (
    <div className="flex gap-4">
      <Field>
        <FieldLabel htmlFor="input-width" className="opacity-50 text-xs">
          Width
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-width"
            type="text"
            placeholder="auto"
            value={widthParsed.number}
            onChange={(e) => setWidth(e.target.value, widthParsed.unit)}
          />
          <InputGroupAddon align="inline-end">
            {widthParsed.unit}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<InputGroupButton variant="secondary" />}
              >
                <ChevronsUpDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {widthUnits.map((unit) => (
                    <DropdownMenuItem
                      key={unit}
                      onClick={() =>
                        setWidth(widthParsed.number || "0", unit)
                      }
                    >
                      {unit}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-height" className="opacity-50 text-xs">
          Height
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-height"
            type="text"
            placeholder="auto"
            value={heightParsed.number}
            onChange={(e) => setHeight(e.target.value, heightParsed.unit)}
          />
          <InputGroupAddon align="inline-end">
            {heightParsed.unit}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<InputGroupButton variant="secondary" />}
              >
                <ChevronsUpDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {heightUnits.map((unit) => (
                    <DropdownMenuItem
                      key={unit}
                      onClick={() =>
                        setHeight(heightParsed.number || "0", unit)
                      }
                    >
                      {unit}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
