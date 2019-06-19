import { stopDemo } from "./";
import { testCreator } from "../../../../testUtils";
import { GameId } from "../../../../../games/dist/list";

testCreator(stopDemo, [
  {
    description: "Stopping a demo sets playing to false",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: 666,
          },
        },
      },
    },
    payload: {
      gameId: "amazons" as GameId,
    },
    expected: {
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
  },
]);
