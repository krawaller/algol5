import { stopDemo } from "./stopDemo";
import { testCreator } from "../../../testUtils";
import { GameId } from "../../../../games/dist/list";

testCreator(stopDemo, [
  {
    description: "Stopping a demo sets playing to false and clears playId",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: true,
            playId: 666,
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
