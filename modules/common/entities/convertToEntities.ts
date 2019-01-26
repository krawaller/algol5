import { pos2coords, coords2pos } from "../";

export function convertToEntities(def) {
  switch (def[0]) {
    case "pos": // ["pos",list,blueprint]
      return def[1].map(function(pos) {
        return { ...{ pos: pos }, ...def[2] };
      });
    case "rect": // ["rect",bottomleft,topright,blueprint]
    case "holerect": // ["holerect",bottomleft,topright,holes,blueprint]
      var bottomleft = pos2coords(def[1]);
      var topright = pos2coords(def[2]);
      var blueprint = def[3];
      var positions = [];
      for (var x = bottomleft.x; x <= topright.x; x++) {
        for (var y = bottomleft.y; y <= topright.y; y++) {
          positions.push(coords2pos({ x: x, y: y }));
        }
      }
      if (def[0] === "holerect") {
        blueprint = def[4];
        positions = positions.filter(function(p) {
          return def[3].indexOf(p) === -1;
        });
      }
      return positions.map(function(p) {
        return { ...{ pos: p }, ...blueprint };
      });
    default:
      if (typeof def === "string") {
        return [{ pos: def }];
      } else if (typeof def === "object") {
        // TODO - exclude arrays, funcs, etc
        return [def];
      } else {
        throw "Unknown entity def: " + def;
      }
  }
}
