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
            frame: 2,
            inflated: true,
            playing: 666,
          },
        },
      },
    },
  },
  {
    description: "We can step by given offset",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}, {}],
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
      offset: 2,
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}, {}],
            anims: {},
            frame: 3,
            inflated: true,
            playing: 666,
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
            frame: 0,
            inflated: true,
            playing: 666,
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
          },
        },
      },
    },
  },
  {
    description: "If demo isn't playing we still step if we force",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
          },
        },
      },
    },
    payload: {
      gameId: "amazons" as GameId,
      force: true,
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}, {}],
            anims: {},
            frame: 3,
            inflated: true,
          },
        },
      },
    },
  },
  {
    description: "Negative offset loops around correctly",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}, {}],
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
      offset: -3,
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [{}, {}, {}, {}],
            anims: {},
            frame: 2,
            inflated: true,
            playing: 666,
          },
        },
      },
    },
  },
]);
