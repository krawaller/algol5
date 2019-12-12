import { stepAllDemos } from "./stepAllDemos";
import { testCreator } from "../../../testUtils";

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
            playId: 777,
          },
          aries: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: true,
            playId: 777,
          },
          atrium: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
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
            playId: 777,
          },
          aries: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 0,
            inflated: true,
            playing: true,
            playId: 777,
          },
          atrium: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
          },
        },
      },
    },
  },
]);
