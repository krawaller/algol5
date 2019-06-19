import { stopAllDemos } from "./";
import { testCreator } from "../../../../testUtils";

testCreator(stopAllDemos, [
  {
    description: "Stopping all demos sets every playing variable to false",
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
            frame: 1,
            inflated: true,
            playing: true,
            playId: 777,
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
            frame: 1,
            inflated: true,
            playId: 777,
          },
          aries: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playId: 777,
          },
        },
      },
    },
  },
]);
