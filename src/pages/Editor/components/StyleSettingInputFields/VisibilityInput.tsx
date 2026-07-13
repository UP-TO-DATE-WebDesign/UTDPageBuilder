import { Eye, EyeOff } from "lucide-react";
import { useStylesStore } from "../../stores/stylesStore";
import { findProperty } from "./findProperty";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "@/components/ui/button-group";

export default function VisibilityInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);

  const display = findProperty(sectors, ["display", "visibility"]);
  const isHidden = display?.property.value === "none";

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-50 text-xs">Visibility</Label>
      <ButtonGroup className="w-full">
        <Button
          variant={isHidden ? "outline" : "default"}
          className="flex-1"
          disabled={!display}
          onClick={() =>
            display &&
            setPropertyValue(display.sectorId, display.property.id, "block")
          }
        >
          <Eye /> Visible
        </Button>
        <Button
          variant={isHidden ? "default" : "outline"}
          className="flex-1"
          disabled={!display}
          onClick={() =>
            display &&
            setPropertyValue(display.sectorId, display.property.id, "none")
          }
        >
          <EyeOff />
          Hidden
        </Button>
      </ButtonGroup>
    </div>
  );
}
