// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { TyrannosBlob } from "../../../../games/dist/games/tyrannos";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<TyrannosBlob> = {
  darkwarrior: {
    marks: ["c3"],
    potentialMarks: ["b4", "c4", "d4"],
    setup: {
      warriors: {
        1: ["a3", "b3", "c3", "d3"],
      },
      heroes: {
        1: ["a2", "b2", "c2"],
      },
      tyrannos: {
        1: ["e2"],
      },
    },
  },
  lightwarrior: {
    marks: ["d3"],
    potentialMarks: ["d4"],
    setup: {
      warriors: {
        1: ["a3", "b3", "c3", "d3"],
      },
      heroes: {
        1: ["a2", "b2", "c2"],
      },
      tyrannos: {
        1: ["e2"],
      },
    },
  },
};
