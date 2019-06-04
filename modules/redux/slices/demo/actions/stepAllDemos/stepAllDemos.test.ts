import { stepAllDemos } from "./";
import { testCreator } from "../../../../utils";

testCreator(stepAllDemos, [
  {
    description: "Stepping goes to next frame for all playing demos",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: true,
          },
          aries: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: true,
          },
          atrium: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: false,
          },
        },
      },
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: true,
          },
          aries: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 0,
            inflated: true,
            playing: true,
          },
          atrium: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: false,
          },
        },
      },
    },
  },
]);
