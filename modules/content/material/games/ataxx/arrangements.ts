// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { AtaxxBlob } from "../../../../games/dist/games/ataxx";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<AtaxxBlob> = {
  example1before: {
    marks: ["a1"],
    potentialMarks: ["b1", "c2"],
    setup: {
      microbes: {
        1: ["a1", "b4", "c4", "d3", "d4", "e3", "e4"],
        2: ["a2", "a3", "a4", "b2", "b3", "c1", "c3", "d1", "d2", "e1", "e2"],
      },
    },
  },
  example1split: {
    marks: ["a1", "b1"],
    setup: {
      microbes: {
        1: ["a1", "a2", "b1", "b2", "b4", "c1", "c4", "d3", "d4", "e3", "e4"],
        2: ["a3", "a4", "b3", "c3", "d1", "d2", "e1", "e2"],
      },
    },
  },
  example1jump: {
    marks: ["a1", "c2"],
    setup: {
      microbes: {
        1: [
          "b2",
          "b3",
          "b4",
          "c1",
          "c2",
          "c3",
          "c4",
          "d1",
          "d2",
          "d3",
          "d4",
          "e3",
          "e4",
        ],
        2: ["a2", "a3", "a4", "e1", "e2"],
      },
    },
  },
};
