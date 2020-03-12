// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { AriesBlob } from "../../../../games/dist/games/aries";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<AriesBlob> = {
  beforepush1: {
    marks: ["f1", "d1"],
    setup: {
      soldiers: {
        1: ["a1", "f1"],
        2: ["b1", "c1", "d1"],
      },
    },
  },
  afterpush1: {
    setup: {
      soldiers: {
        1: ["a1", "d1"],
        2: ["b1", "c1"],
      },
    },
  },
};
