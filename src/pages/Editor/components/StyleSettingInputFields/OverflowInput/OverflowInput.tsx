import { useStylesStore } from "../../../stores/stylesStore";
import { findProperty } from "../findProperty";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "@/components/ui/button-group";
import reference from "./OverflowInput.json";

export default function OverflowInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);
  const overflow = findProperty(sectors, [reference.id]);

  const setOverflow = (value: string) => {
    if (overflow) {
      setPropertyValue(overflow.sectorId, overflow.property.id, value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-50 text-xs">{reference.label}</Label>
      <ButtonGroup className="w-full">
        {reference.options.map((option) => (
          <Button
            key={option.id}
            variant={
              overflow?.property?.value === option.id ? "default" : "outline"
            }
            className="flex-1"
            onClick={() => setOverflow(option.id)}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
