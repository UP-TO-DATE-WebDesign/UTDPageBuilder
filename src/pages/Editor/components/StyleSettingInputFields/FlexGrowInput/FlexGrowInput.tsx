import { useStylesStore } from "../../../stores/stylesStore";
import { findProperty } from "../findProperty";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import reference from "./FlexGrowInput.json";

export default function FlexGrowInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);

  const flexGrow = findProperty(sectors, [reference.id]);

  const setValue = (value: string) => {
    if (flexGrow)
      setPropertyValue(flexGrow.sectorId, flexGrow.property.id, value);
  };

  return (
    <Field>
      <FieldLabel htmlFor="input-flex-grow" className="opacity-50 text-xs">
        {reference.label}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="input-flex-grow"
          type="number"
          min={reference.min}
          step={reference.step}
          placeholder={String(reference.default)}
          value={flexGrow?.property.value ?? ""}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputGroup>
    </Field>
  );
}
