// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  DescentPosition,
  DescentUnit,
} from "../../../../games/dist/games/descent";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<DescentPosition, DescentUnit> = {
  levels: {
    setup: {
      lvl3: { 0: ["a1"] },
      lvl2: { 0: ["b1"] },
      lvl1: { 0: ["c1"] },
      lvl0: { 0: ["d1"] },
    },
  },
  move1: {
    marks: ["b2"],
    potentialMarks: ["b1", "a3", "c3", "a2", "c1"],
    setup: {
      lvl3: {
        0: ["b1", "a3", "b4", "d4", "d3"],
        1: ["b3"],
        2: ["a4"],
      },
      lvl2: { 0: ["c3", "a2", "d1", "c4"], 1: ["b2"], 2: ["a1"] },
      lvl1: { 0: ["c1"], 1: ["d2"], 2: [] },
      lvl0: { 0: ["c2"], 1: [], 2: [] },
    },
  },
  dig1: {
    marks: ["b1"],
    potentialMarks: ["a2", "b2", "c1"],
    setup: {
      lvl3: {
        0: ["a3", "b4", "d4", "d3"],
        1: ["b3", "b1"],
        2: ["a4"],
      },
      lvl2: { 0: ["c3", "a2", "b2", "d1", "c4"], 1: [], 2: ["a1"] },
      lvl1: { 0: ["c1"], 1: ["d2"], 2: [] },
      lvl0: { 0: ["c2"], 1: [], 2: [] },
    },
  },
};
