import { useStylesStore } from "../../../stores/stylesStore";
import { findProperty } from "../findProperty";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "@/components/ui/button-group";
import reference from "./ImageFitInput.json";

export default function ImageFitInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);
  const objectFit = findProperty(sectors, [reference.id]);

  const setObjectFit = (value: string) => {
    if (objectFit) {
      setPropertyValue(objectFit.sectorId, objectFit.property.id, value);
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
              objectFit?.property?.value === option.id ? "default" : "outline"
            }
            className="flex-1"
            onClick={() => setObjectFit(option.id)}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
