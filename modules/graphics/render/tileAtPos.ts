import { Layer, FullDefAnon } from "../../types";

export function tileAtPos(
  layers: { [name: string]: Layer },
  tilemap: FullDefAnon["graphics"]["tiles"],
  pos: string
) {
  const found = Object.keys(tilemap).find(name => (layers[name] || {})[pos]);
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
}
