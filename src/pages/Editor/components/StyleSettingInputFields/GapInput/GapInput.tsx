import { ChevronsUpDown } from "lucide-react";
import { useStylesStore } from "../../../stores/stylesStore";
import { findProperty } from "../findProperty";
import { parseSize } from "../parseSize";
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
import reference from "./GapInput.json";

export default function GapInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);

  const gap = findProperty(sectors, [reference.id]);

  const parsed = parseSize(gap?.property.value ?? "", reference.units[0]);

  const setGap = (number: string, unit: string) => {
    if (!gap) return;
    setPropertyValue(
      gap.sectorId,
      gap.property.id,
      number.trim() === "" ? "" : `${number}${unit}`,
    );
  };

  return (
    <Field>
      <FieldLabel htmlFor="input-gap" className="opacity-50 text-xs">
        {reference.label}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="input-gap"
          type="text"
          placeholder="normal"
          value={parsed.number}
          onChange={(e) => setGap(e.target.value, parsed.unit)}
        />
        <InputGroupAddon align="inline-end">
          {parsed.unit}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<InputGroupButton variant="secondary" />}
            >
              <ChevronsUpDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {reference.units.map((unit) => (
                  <DropdownMenuItem
                    key={unit}
                    onClick={() => setGap(parsed.number || "0", unit)}
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
  );
}
