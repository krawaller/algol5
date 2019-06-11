import { stepDemo } from "./";
import { testCreator } from "../../../../testUtils";
import { GameId } from "../../../../../games/dist/list";

testCreator(stepDemo, [
  {
    description: "Stepping goes to next frame",
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
            frame: 2,
            inflated: true,
            playing: true,
          },
        },
      },
    },
  },
  {
    description: "Stepping off the last frame loops around",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: true,
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
            frame: 0,
            inflated: true,
            playing: true,
          },
        },
      },
    },
  },
  {
    description: "If demo isn't playing nothing happens",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
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
            frame: 2,
            inflated: true,
            playing: false,
          },
        },
      },
    },
  },
]);
