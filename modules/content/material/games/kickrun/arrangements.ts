// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  KickrunPosition,
  KickrunUnit,
} from "../../../../games/dist/games/kickrun";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<KickrunPosition, KickrunUnit> = {
  sidekicker: {
    marks: ["b3"],
    potentialMarks: ["b4", "c3", "c2"],
    setup: {
      sidekickers: {
        1: ["a1", "b3", "e2"],
        2: ["c2", "d3"],
      },
      runners: {
        1: ["a2"],
        2: ["d5", "e3"],
      },
    },
  },
  runner: {
    marks: ["d5"],
    potentialMarks: ["a5", "b5", "c5", "d5", "c4", "b3", "d4"],
    setup: {
      sidekickers: {
        1: ["a1", "c2", "e2"],
        2: ["d3"],
      },
      runners: {
        1: ["a2"],
        2: ["d5", "e3"],
      },
    },
  },
};
