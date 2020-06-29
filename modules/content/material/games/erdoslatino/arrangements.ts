// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { ErdoslatinoBlob } from "../../../../games/dist/games/erdoslatino";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<ErdoslatinoBlob> = {
  levels: {
    setup: {
      lvl1: { 0: ["a1"] },
      lvl2: { 0: ["b1"] },
      lvl3: { 0: ["c1"] },
      lvl4: { 0: ["d1"] },
      lvl5: { 0: ["e1"] },
    },
  },
  beforeplace: {
    setup: {
      lvl1: { 0: ["c5"] },
      lvl2: { 0: ["c1"] },
      lvl3: { 0: [] },
      lvl4: { 0: ["c4"] },
      lvl5: { 0: [] },
    },
    marks: ["c3"],
  },
  plr1placed: {
    setup: {
      lvl1: { 1: ["c5"] },
      lvl2: { 1: ["c1"] },
      lvl3: { 1: ["c3"] },
      lvl4: { 1: ["c4"] },
      lvl5: { 1: [] },
    },
    marks: ["c3"],
  },
  plr2placed: {
    setup: {
      lvl1: { 2: ["c5"] },
      lvl2: { 2: ["c1"] },
      lvl3: { 2: [] },
      lvl4: { 2: ["c4"] },
      lvl5: { 2: ["c3"] },
    },
    marks: ["c3"],
  },
};
