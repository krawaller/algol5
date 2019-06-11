import { startDemo } from "./";
import { testCreator } from "../../../../utils";
import { GameId } from "../../../../../games/dist/list";
import { defaultSpeed } from "../../constants";

testCreator(startDemo, [
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
            playing: false,
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
            playing: true,
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
            playing: false,
          },
        },
      },
    },
    payload: {
      gameId: "amazons" as GameId,
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
            playing: true,
            speed: 666,
          },
        },
      },
    },
  },
]);
