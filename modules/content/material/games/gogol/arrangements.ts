// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { GogolBlob } from "../../../../games/dist/games/gogol";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<GogolBlob> = {
  homerow: {
    setup: {
      kings: {
        1: ["e1"],
      },
      soldiers: {
        1: ["d1"],
      },
    },
  },
  secondrow: {
    setup: {
      kings: {
        1: ["e2"],
      },
      soldiers: {
        1: ["d1", "e1", "f1"],
      },
    },
  },
  side: {
    setup: {
      kings: {
        1: ["a4"],
      },
      soldiers: {
        1: ["a3"],
      },
    },
  },
};
