import { Eye, EyeOff } from "lucide-react";
import { useStylesStore } from "../../stores/stylesStore";
import { findProperty } from "./findProperty";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "@/components/ui/button-group";

export default function VisibilityInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);
  const ensureProperty = useStylesStore((state) => state.ensureProperty);

  const visibility = findProperty(sectors, ["visibility"]);
  const isHidden = visibility?.property.value === "hidden";

  // "visibility" almost certainly isn't in the default style manager config
  // (same situation "float"/"display" started in) - ensure it exists before
  // writing to it. ensureProperty's refreshStyles() runs synchronously, so
  // re-reading via getState() immediately after picks up the freshly
  // created property instead of the stale `visibility` this render closed
  // over.
  const setVisibility = (value: string) => {
    if (!visibility) {
      ensureProperty({
        id: "visibility",
        label: "Visibility",
        default: "visible",
        options: [
          { id: "visible", label: "Visible" },
          { id: "hidden", label: "Hidden" },
        ],
      });
    }
    const fresh = findProperty(useStylesStore.getState().sectors, [
      "visibility",
    ]);
    if (fresh) setPropertyValue(fresh.sectorId, fresh.property.id, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-50 text-xs">Visibility</Label>
      <ButtonGroup className="w-full">
        <Button
          variant={isHidden ? "outline" : "default"}
          className="flex-1"
          onClick={() => setVisibility("visible")}
        >
          <Eye /> Visible
        </Button>
        <Button
          variant={isHidden ? "default" : "outline"}
          className="flex-1"
          onClick={() => setVisibility("hidden")}
        >
          <EyeOff />
          Hidden
        </Button>
      </ButtonGroup>
    </div>
  );
}
