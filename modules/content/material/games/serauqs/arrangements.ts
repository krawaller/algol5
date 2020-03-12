// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { SerauqsBlob } from "../../../../games/dist/games/serauqs";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<SerauqsBlob> = {
  cornerwin: {
    setup: {
      soldiers: {
        1: ["b3", "c2", "b4"],
        2: ["a1", "a4", "d4"],
      },
      wild: {
        1: ["d1"],
        2: ["b2"],
      },
    },
  },
  centerwin: {
    setup: {
      soldiers: {
        1: ["c1", "d2", "c4"],
        2: ["c2", "b2", "a3"],
      },
      wild: {
        1: ["c3"],
        2: ["b3"],
      },
    },
  },
  linewin: {
    setup: {
      soldiers: {
        1: ["a1", "b2", "c4"],
        2: ["c2", "d3", "a3"],
      },
      wild: {
        1: ["c3"],
        2: ["b3"],
      },
    },
  },
};
