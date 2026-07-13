import { AlignEndVertical, AlignStartVertical } from "lucide-react";
import {
  useStylesStore,
  type StyleSectorInfo,
  type StylePropertyInfo,
} from "../../stores/stylesStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ButtonGroup } from "@/components/ui/button-group";

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

export default function FloatInput() {
  const sectors = useStylesStore((state) => state.sectors);
  const setPropertyValue = useStylesStore((state) => state.setPropertyValue);
  const ensureFloatProperty = useStylesStore(
    (state) => state.ensureFloatProperty,
  );

  const float = findProperty(sectors, ["float"]);

  // "float" may not exist as a property yet (see ensureFloatProperty in
  // stylesStore.ts) - Left/Right are the only actions that actually need it
  // registered, so they create it on demand here rather than up front.
  // ensureFloatProperty's refreshStyles() runs synchronously, so re-reading
  // via getState() immediately after picks up the freshly created property
  // instead of the stale `float` this render closed over.
  const setFloat = (value: string) => {
    if (!float) ensureFloatProperty();
    const fresh = findProperty(useStylesStore.getState().sectors, ["float"]);
    if (fresh) setPropertyValue(fresh.sectorId, fresh.property.id, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-50 text-xs">Float</Label>
      <ButtonGroup className="w-full">
        <Button
          variant={!float || float.property.value === "none" ? "default" : "outline"}
          className="flex-1"
          onClick={() =>
            float && setPropertyValue(float.sectorId, float.property.id, "none")
          }
        >
          None
        </Button>
        <Button
          variant={float?.property?.value == "left" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setFloat("left")}
        >
          <AlignStartVertical /> Left
        </Button>
        <Button
          variant={float?.property?.value == "right" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setFloat("right")}
        >
          <AlignEndVertical /> Right
        </Button>
      </ButtonGroup>
    </div>
  );
}
