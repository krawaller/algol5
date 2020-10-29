// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { PartisansBlob } from "../../../../games/dist/games/partisans";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<PartisansBlob> = {
  beforefiring: {
    setup: {
      amazons: {
        1: ["a1"],
      },
      stones: {
        2: ["b1", "c1"],
      },
    },
    marks: ["a1", "d1"],
  },
  afterfiring: {
    setup: {
      amazons: {
        1: ["a1"],
      },
      stones: {
        1: ["b1", "c1", "d1"],
      },
    },
    marks: ["a1", "d1"],
  },
};
