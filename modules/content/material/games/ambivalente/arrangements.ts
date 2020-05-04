// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { AmbivalenteBlob } from "../../../../games/dist/games/ambivalente";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<AmbivalenteBlob> = {
  example1before: {
    marks: ["b2"],
    setup: {
      pawns: {
        1: ["a3", "b1", "b3", "c2"],
        2: ["d2"],
      },
    },
  },
  example1after: {
    marks: [],
    setup: {
      pawns: {
        0: ["b1", "b3", "c2"],
        1: ["a3"],
        2: ["d2", "b2"],
      },
    },
  },
  cornerintrusionbefore: {
    marks: ["a1"],
    setup: {
      pawns: {
        2: ["a2", "b1"],
      },
    },
  },
  cornerintrusionafter: {
    marks: [],
    setup: {
      pawns: {
        0: ["a2", "b1"],
        1: ["a1"],
      },
    },
  },
  cornerencirclingbefore: {
    marks: ["f2"],
    setup: {
      pawns: {
        1: ["f1"],
        2: ["e1"],
      },
    },
  },
  cornerencirclingafter: {
    marks: [],
    setup: {
      pawns: {
        0: ["f1"],
        2: ["e1", "f2"],
      },
    },
  },
};
