import { setDemoSpeed } from "./setDemoSpeed";
import { testCreator } from "../../../testUtils";
import { GameId } from "../../../../games/dist/list";

testCreator(setDemoSpeed, [
  {
    description: "Starting a demo sets playing to true and default speed",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
          },
        },
      },
    },
    payload: {
      gameId: "amazons" as GameId,
      speed: 777,
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            speed: 777,
          },
        },
      },
    },
  },
]);
