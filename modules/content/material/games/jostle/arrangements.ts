// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  JostlePosition,
  JostleUnit,
} from "../../../../games/dist/games/jostle";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<JostlePosition, JostleUnit> = {
  jostle1: {
    marks: ["b2", "c2"],
    setup: {
      checkers: {
        1: ["c3", "a2", "b2", "b4", "e2"],
        2: ["b3", "d2", "b1"],
      },
    },
  },
  jostle2: {
    marks: [],
    setup: {
      checkers: {
        1: ["c3", "a2", "c2", "b4", "e2"],
        2: ["b3", "d2", "b1"],
      },
    },
  },
};
