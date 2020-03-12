// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { DuploBlob } from "../../../../games/dist/games/duplo";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<DuploBlob> = {
  before: {
    setup: {
      soldiers: {
        1: ["d1", "e1", "f1"],
        2: ["h1"],
      },
    },
  },
  left: {
    setup: {
      soldiers: {
        1: ["a1", "b1", "c1", "d1", "e1", "f1"],
        2: ["h1"],
      },
    },
  },
  right: {
    setup: {
      soldiers: {
        0: ["h1"],
        1: ["d1", "e1", "f1", "g1"],
      },
    },
  },
};
