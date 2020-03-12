// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { CoffeeBlob } from "../../../../games/dist/games/coffee";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<CoffeeBlob> = {
  example1: {
    marks: [],
    potentialMarks: ["a4", "b4", "c4", "e4"],
    setup: {
      soldiers: {
        0: ["a4", "b4", "c4", "e4"],
        1: ["b2"],
        2: ["d4"],
      },
    },
  },
};
