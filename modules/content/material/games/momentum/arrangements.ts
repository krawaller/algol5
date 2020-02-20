// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  MomentumPosition,
  MomentumUnit,
} from "../../../../games/dist/games/momentum";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<MomentumPosition, MomentumUnit> = {
  beforepush1: {
    marks: ["d5"],
    setup: {
      stones: {
        1: ["c6", "e6", "e5", "g5", "a4", "b5"],
        2: ["b7", "c5", "b4", "f4", "f6", "f5"],
      },
    },
  },
  afterpush1: {
    setup: {
      stones: {
        1: ["c6", "f7", "e5", "a4", "a5", "d5"],
        2: ["c5", "b4", "f4", "f6", "f5"],
      },
    },
  },
};
