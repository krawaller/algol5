// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import { SupportBlob } from "../../../../games/dist/games/support";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<SupportBlob> = {
  marked: {
    setup: {
      bases: { 1: ["c2"], 2: ["b3"] },
      soldiers: { 1: ["c1", "d2"], 2: ["e3"] },
    },
    marks: ["c1"],
    potentialMarks: ["b2", "e3"],
  },
  pushleft: {
    setup: {
      bases: { 1: ["c2"], 2: ["b3"] },
      soldiers: { 1: ["b2", "c1", "d2"], 2: ["e3"] },
    },
    marks: ["c1", "b2"],
  },
  pushright: {
    setup: {
      bases: { 1: ["c2"], 2: ["b3"] },
      soldiers: { 1: ["c1", "d2", "e3"], 2: [] },
    },
    marks: ["c1", "e3"],
  },
};
