import { stopAllDemos } from "./";
import { testCreator } from "../../../../utils";

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
            playing: true
          },
          aries: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: true
          }
        }
      }
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: false
          },
          aries: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: false
          }
        }
      }
    }
  }
]);
