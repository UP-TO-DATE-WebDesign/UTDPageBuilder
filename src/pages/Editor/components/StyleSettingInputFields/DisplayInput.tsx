import { useStylesStore } from "../../stores/stylesStore";
import { findProperty } from "./findProperty";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "@/components/ui/button-group";

export default function DisplayInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);
  // "display" is registered up front by the wired style manager reference
  // data (see data/site-editor-property-reference/) - no ensureProperty
  // fallback needed here, unlike "float"/"visibility", which aren't in that
  // data and still rely on it.
  const display = findProperty(sectors, ["display"]);

  const setDisplay = (value: string) => {
    if (display) setPropertyValue(display.sectorId, display.property.id, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-50 text-xs">Display</Label>
      <ButtonGroup className="w-full">
        <Button
          variant={display?.property?.value == "block" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setDisplay("block")}
        >
          Block
        </Button>
        <Button
          variant={display?.property?.value == "inline" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setDisplay("inline")}
        >
          Inline
        </Button>
        <Button
          variant={
            display?.property?.value == "inline-block" ? "default" : "outline"
          }
          className="flex-1"
          onClick={() => setDisplay("inline-block")}
        >
          Inline-Block
        </Button>
        <Button
          variant={display?.property?.value == "flex" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setDisplay("flex")}
        >
          Flex
        </Button>
        <Button
          variant={display?.property?.value == "none" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setDisplay("none")}
        >
          None
        </Button>
      </ButtonGroup>
    </div>
  );
}
