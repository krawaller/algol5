import { BoardAnon } from "../../types";
import { convertToEntities, boardPositions } from "../";

/*
Calculates all terrain layers and returns them. 
This should be done per player if any terrain has owner.
*/
export function terrainLayers(board: BoardAnon, forplayer?, aiterrain?): any {
  var terrainDef = { ...board.terrain, ...aiterrain };
  if (!Object.keys(terrainDef).length) {
    return {};
  }
  var terrain = Object.keys(terrainDef).reduce(function(mem, name) {
    var def = terrainDef[name];
    mem[name] = {};
    if (Array.isArray(def)) {
      // no ownership, we got array of entityddefs directly
      def.forEach(function(entityDef) {
        convertToEntities(entityDef).forEach(function(e) {
          mem[name][e.pos] = e;
        });
      });
    } else {
      // per-player object
      for (var o in def) {
        let owner = parseInt(o);
        def[owner].forEach(function(entityDef) {
          convertToEntities(entityDef).forEach(function(e) {
            e.owner = owner;
            mem[name][e.pos] = e;
            var prefix =
              owner === 0 ? "neutral" : owner === forplayer ? "my" : "opp";
            mem[prefix + name] = mem[prefix + name] || {};
            mem[prefix + name][e.pos] = e;
          });
        });
      }
    }
    return mem;
  }, {});
  // add no-variants of layers and return
  return Object.keys(terrain).reduce(function(mem, name) {
    if (!name.match(/^my/) && !name.match(/^opp/)) {
      var t = terrain[name];
      var noname = "no" + name;
      mem[noname] = {};
      boardPositions(board).forEach(function(pos) {
        if (!t[pos]) {
          mem[noname][pos] = { pos: pos };
        }
      });
    }
    return mem;
  }, terrain);
}
