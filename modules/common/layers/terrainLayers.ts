import { LayerCollection, AlgolBoardAnon } from "../../types";
import { processEntity, boardPositions } from "../";

/*
Calculates all terrain layers and returns them. 
This should be done per player if any terrain has owner.
*/
export function terrainLayers(
  board: AlgolBoardAnon,
  forplayer?: 1 | 2
): LayerCollection {
  const { terrain: terrainDef = {} } = board;
  if (!Object.keys(terrainDef).length) {
    return {};
  }
  const terrain = Object.keys(terrainDef).reduce((mem, name) => {
    const def = terrainDef[name];
    mem[name] = {};
    if (Array.isArray(def)) {
      // no ownership, we got array of entityddefs directly
      def.forEach(function(entityDef) {
        processEntity(entityDef).forEach(e => {
          mem[name][e.pos] = e;
        });
      });
    } else {
      // per-player object
      for (const o in def) {
        const owner = parseInt(o);
        def[owner as 0 | 1 | 2]!.forEach(entityDef => {
          processEntity(entityDef).forEach(e => {
            e.owner = owner;
            mem[name][e.pos] = e;
            const prefix =
              owner == 0 ? "neutral" : owner == forplayer ? "my" : "opp";
            mem[prefix + name] = mem[prefix + name] || {};
            mem[prefix + name][e.pos] = e;
          });
        });
      }
    }
    return mem;
  }, {} as LayerCollection);
  // add no-variants of layers and return
  return Object.keys(terrain).reduce((mem, name) => {
    if (!name.match(/^my/) && !name.match(/^opp/)) {
      const t = terrain[name];
      const noname = "no" + name;
      mem[noname] = {};
      boardPositions(board).forEach(pos => {
        if (!t[pos]) {
          mem[noname][pos] = processEntity(pos)[0];
        }
      });
    }
    return mem;
  }, terrain);
}
