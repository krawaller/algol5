// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  AmazonsPosition,
  AmazonsUnit,
} from "../../../../games/dist/games/amazons";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<AmazonsPosition, AmazonsUnit> = {
  gnork: {
    marks: ["a1"],
    potentialMarks: ["a2", "a3"],
    setup: {
      amazons: {
        1: ["a1", "b5", "c6"],
      },
      fires: {
        0: ["b1", "c1"],
      },
    },
  },
};
