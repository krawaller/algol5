// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  GekitaiPosition,
  GekitaiUnit,
} from "../../../../games/dist/games/gekitai";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<GekitaiPosition, GekitaiUnit> = {
  beforepush1: {
    marks: ["b2"],
    setup: {
      markers: {
        1: ["a1", "c2", "e3"],
        2: ["a2", "d2", "b3"],
      },
    },
  },
  afterpush1: {
    setup: {
      markers: {
        1: ["b2", "c2", "e3"],
        2: ["d2", "b4"],
      },
    },
  },
};
