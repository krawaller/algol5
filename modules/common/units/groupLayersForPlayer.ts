import { FullDefAnon } from "algol-types";
import { usedUnitLayers } from "./";

/*

*/
type GroupLayersForPlayerResult = { [group: string]: string[][] };

export function groupLayersForPlayer(
  def: FullDefAnon,
  player: 1 | 2
): GroupLayersForPlayerResult {
  const usedLayers = usedUnitLayers(def);
  return Object.keys(def.graphics.icons).reduce(
    (mem, group) => ({
      ...mem,
      [group]:
        player === 1
          ? [
              ["units", "neutralunits", group, `neutral${group}`].filter(l =>
                usedLayers.includes(l)
              ),
              ["units", "myunits", group, `my${group}`].filter(l =>
                usedLayers.includes(l)
              ),
              ["units", "oppunits", group, `opp${group}`].filter(l =>
                usedLayers.includes(l)
              )
            ]
          : [
              ["units", "neutralunits", group, `neutral${group}`].filter(l =>
                usedLayers.includes(l)
              ),
              ["units", "oppunits", group, `opp${group}`].filter(l =>
                usedLayers.includes(l)
              ),
              ["units", "myunits", group, `my${group}`].filter(l =>
                usedLayers.includes(l)
              )
            ]
    }),
    {}
  );
}
