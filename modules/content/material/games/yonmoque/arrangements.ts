// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { YonmoqueBlob } from "../../../../games/dist/games/yonmoque";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<YonmoqueBlob> = {
  capture_before: {
    marks: ["b1", "d3"],
    setup: {
      pawns: {
        2: ["a3"],
        1: ["b3", "c3"],
      },
      bishops: {
        2: ["b1"],
        1: ["d2", "e3"],
      },
    },
  },
  capture_after: {
    setup: {
      pawns: {
        2: ["a3", "c3"],
      },
      bishops: {
        2: ["d3", "b3"],
        1: ["d2", "e3"],
      },
    },
  },
};
