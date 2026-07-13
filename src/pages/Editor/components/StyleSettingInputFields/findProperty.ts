import type { StyleSectorInfo, StylePropertyInfo } from "../../stores/stylesStore";

// The style manager doesn't expose a stable, documented sector layout, so
// rather than hardcoding a sectorId (which a config change could silently
// break) this searches every sector's properties for an id/label match -
// same shape setPropertyValue needs (sectorId + propertyId) either way.
export function findProperty(
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
