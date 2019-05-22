import { stepDemo } from "./";
import { AlgolDemo } from "../../../../../types";
import { testCreator } from "../../../../utils";
import { GameId } from "../../../../../games/dist/list";

testCreator(stepDemo, [
  {
    description: "Stepping goes to next frame",
    payload: {
      gameId: "amazons" as GameId
    },
    previous: {
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
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: true
          }
        }
      }
    }
  },
  {
    description: "Stepping off the last frame loops around",
    payload: {
      gameId: "amazons" as GameId
    },
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
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
            frame: 0,
            inflated: true,
            playing: true
          }
        }
      }
    }
  },
  {
    description: "If demo isn't playing nothing happens",
    payload: {
      gameId: "amazons" as GameId
    },
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: false
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
            frame: 2,
            inflated: true,
            playing: false
          }
        }
      }
    }
  }
]);
