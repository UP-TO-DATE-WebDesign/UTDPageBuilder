import type { StyleSectorInfo, StylePropertyInfo } from "../../stores/stylesStore";

// The style manager doesn't expose a stable, documented sector layout, so
// rather than hardcoding a sectorId (which a config change could silently
// break) this searches every sector's properties for an id match - same
// shape setPropertyValue needs (sectorId + propertyId) either way.
//
// id-only, deliberately: grapesjs defaults a property's `id` to its
// `property` field (the actual CSS property name) whenever no explicit id
// is given - see Property.prototype.initialize - so id is a reliable,
// unique-enough key for this. `label`, on the other hand, is decorative UI
// text the ported reference data (data/site-editor-property-reference/)
// deliberately reuses across unrelated properties (e.g. "display" is
// labeled "Visibility" in one sector and "flex-basis" is labeled "Width" in
// another) - matching on label caused real bugs: a "visibility" lookup
// silently hijacking the "display" property, and a "width" lookup hijacking
// "flex-basis", both via their label rather than their actual CSS property.
export function findProperty(
  sectors: StyleSectorInfo[],
  candidates: string[],
): { sectorId: string; property: StylePropertyInfo } | undefined {
  const wanted = candidates.map((c) => c.toLowerCase());
  for (const sector of sectors) {
    const property = sector.properties.find((p) =>
      wanted.includes(p.id.toLowerCase()),
    );
    if (property) return { sectorId: sector.id, property };
  }
  return undefined;
}
