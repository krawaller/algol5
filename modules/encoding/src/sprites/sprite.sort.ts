import { AlgolSprite } from "../../../types";
import { pos2coords } from "../../../common";

export const sortSprites = (entities: AlgolSprite[]) =>
  entities.slice().sort((e1, e2) => {
    const c1 = pos2coords(e1.pos);
    const c2 = pos2coords(e2.pos);
    return c1.y < c2.y ? -1 : c1.y > c2.y ? 1 : c1.x < c2.x ? -1 : 1;
  });
