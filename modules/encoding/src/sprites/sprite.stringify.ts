import { AlgolSprite } from "../../../types";
import { code2char } from "./sprite.code2char";
import { pos2coords } from "../../../common";
import { sortSprites } from "./sprite.sort";

export const stringifySprites = (sprites: AlgolSprite[]) => {
  let x = 1;
  let y = 1;
  let str = "";
  for (const entity of sortSprites(sprites)) {
    const c = pos2coords(entity.pos);
    if (c.y !== y) {
      str += code2char(["row", c.y as any]);
      y = c.y;
      x = 1;
    }
    if (c.x !== x) {
      str += code2char(["skip", (c.x - x) as any]);
      x += c.x - x;
    }
    if (entity.unit) {
      str += code2char([
        "icon",
        entity.unit.icon,
        entity.unit.owner,
        entity.mark || "none",
      ]);
      x += 1;
    } else {
      str += code2char(entity.mark === "mark" ? ["mark"] : ["pot"]);
      x += 1;
    }
  }
  return str.replace(/(.)\1+/g, repeatedChars => {
    const count = repeatedChars.length;
    if (count > 2) {
      return repeatedChars[0] + code2char(["repeat", (count - 1) as any]);
    }
    return repeatedChars;
  });
};
