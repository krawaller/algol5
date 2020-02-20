import { AlgolSprite, AlgolArrangement, AlgolIconMap } from "../../types";
import { setup2army } from "../units";
import { board2sprites } from "./sprite.board2sprites";

type Arrangement2spritesOpts = {
  arrangement: AlgolArrangement;
  iconMap: AlgolIconMap;
};

export const arrangement2sprites = (
  opts: Arrangement2spritesOpts
): AlgolSprite[] => {
  const { arrangement, iconMap } = opts;
  const { marks = [], potentialMarks = [], setup } = arrangement;
  const units = setup2army(setup);
  return board2sprites({
    iconMap,
    marks,
    potentialMarks,
    units,
  });
};
