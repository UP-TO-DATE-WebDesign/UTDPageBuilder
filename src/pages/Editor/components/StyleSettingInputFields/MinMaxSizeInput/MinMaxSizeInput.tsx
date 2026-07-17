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
import reference from "./MinMaxSizeInput.json";

const [minWidthReference, maxWidthReference, minHeightReference, maxHeightReference] =
  reference;

function SizeField({
  id,
  label,
  units,
  placeholder,
}: {
  id: string;
  label: string;
  units: string[];
  placeholder: string;
}) {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);

  const property = findProperty(sectors, [id]);
  const parsed = parseSize(property?.property.value ?? "", units[0]);

  const setValue = (number: string, unit: string) => {
    if (!property) return;
    setPropertyValue(
      property.sectorId,
      property.property.id,
      number.trim() === "" ? "" : `${number}${unit}`,
    );
  };

  return (
    <Field>
      <FieldLabel htmlFor={`input-${id}`} className="opacity-50 text-xs">
        {label}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={`input-${id}`}
          type="text"
          placeholder={placeholder}
          value={parsed.number}
          onChange={(e) => setValue(e.target.value, parsed.unit)}
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
                {units.map((unit) => (
                  <DropdownMenuItem
                    key={unit}
                    onClick={() => setValue(parsed.number || "0", unit)}
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

export default function MinMaxSizeInput() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <SizeField
          id={minWidthReference.id}
          label={minWidthReference.label}
          units={minWidthReference.units}
          placeholder={minWidthReference.default}
        />
        <SizeField
          id={maxWidthReference.id}
          label={maxWidthReference.label}
          units={maxWidthReference.units}
          placeholder={maxWidthReference.default}
        />
      </div>
      <div className="flex gap-4">
        <SizeField
          id={minHeightReference.id}
          label={minHeightReference.label}
          units={minHeightReference.units}
          placeholder={minHeightReference.default}
        />
        <SizeField
          id={maxHeightReference.id}
          label={maxHeightReference.label}
          units={maxHeightReference.units}
          placeholder={maxHeightReference.default}
        />
      </div>
    </div>
  );
}
