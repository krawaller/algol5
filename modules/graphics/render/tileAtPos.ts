import { Layer, FullDefAnon } from "../../types";

export function tileAtPos(
  layers: { [name: string]: Layer },
  tilemap: FullDefAnon["graphics"]["tiles"],
  pos: string
) {
  const found = Object.keys(tilemap).find(name => layers[name][pos]);
  if (found) {
    const square = layers[found][pos];
    if (tilemap[found] === "playercolour") {
      if (square.owner === undefined) {
        throw new Error("Playercolour tile had no owner!");
      }
      return `player${square.owner}base`;
    } else {
      return tilemap[found] as string;
    }
  }
  return "empty";

  return Object.keys(tilemap).reduce(function(mem, name) {
    console.log(layers[name][pos]);
    return layers[name][pos]
      ? tilemap[name] === "playercolour"
        ? `player${layers[name][pos].owner}base`
        : (tilemap[name] as string)
      : mem;
  }, "empty");
}
