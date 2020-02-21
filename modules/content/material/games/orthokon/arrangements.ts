// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  OrthokonPosition,
  OrthokonUnit,
} from "../../../../games/dist/games/orthokon";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<OrthokonPosition, OrthokonUnit> = {
  beforemove1: {
    marks: ["b1"],
    potentialMarks: ["a1", "a2", "b4", "d3"],
    setup: {
      soldiers: {
        1: ["c1", "c3", "c4", "d1", "d2"],
        2: ["a4", "b1", "d4"],
      },
    },
  },
  aftermove1: {
    setup: {
      soldiers: {
        1: ["c1", "c4", "d1"],
        2: ["a4", "d2", "c3", "d3", "d4"],
      },
    },
  },
};
