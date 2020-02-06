import { Layer, FullDefAnon } from "../../types";

export function tileAtPos(
  layers: { [name: string]: Layer },
  tilemap: FullDefAnon["graphics"]["tiles"],
  pos: string
) {
  return Object.keys(tilemap).reduce(function(mem, name) {
    return layers[name][pos]
      ? tilemap[name] === "playercolour"
        ? { 1: "player1base", 2: "player2base" }[
            layers[name][pos].owner as 1 | 2
          ]
        : tilemap[name]
      : mem;
  }, "empty");
}
