import { startDemo } from "./";
import { testCreator } from "../../../../utils";
import { GameId } from "../../../../../games/dist/list";

testCreator(startDemo, [
  {
    description: "Starting a demo sets playing to true",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: false
          }
        }
      }
    },
    payload: {
      gameId: "amazons" as GameId
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: true
          }
        }
      }
    }
  }
]);
