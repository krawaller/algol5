import { startDemo } from "./";
import { testCreator } from "../../../../testUtils";
import { GameId } from "../../../../../games/dist/list";
import { defaultSpeed } from "../../constants";

testCreator(startDemo, [
  {
    description: "Starting a demo sets playing to id and default speed",
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
      id: 777,
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: 777,
            speed: defaultSpeed,
          },
        },
      },
    },
  },
  {
    description: "can also start with specific speed",
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
      id: 777,
      speed: 666,
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 1,
            inflated: true,
            playing: 777,
            speed: 666,
          },
        },
      },
    },
  },
]);
