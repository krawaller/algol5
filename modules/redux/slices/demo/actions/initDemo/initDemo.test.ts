import { initDemo } from "./";
import { AlgolDemo } from "algol-types";
import { testCreator } from "../../../../utils";
import { GameId } from "../../../../../games/dist/list";

const dummyDemoDef: AlgolDemo = {
  anims: { 0: { exitTo: { a1: "b2" } } },
  initial: { unit1: { pos: "a1", group: "pawns", id: "unit1", owner: 1 } },
  patches: []
};

testCreator(initDemo, [
  {
    description:
      "Initiating from nothing creates new uninflated entry with playing",
    previous: { demo: { demos: {} } },
    payload: {
      gameId: "amazons" as GameId,
      demo: dummyDemoDef
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [dummyDemoDef.initial],
            anims: dummyDemoDef.anims,
            frame: 0,
            inflated: false,
            playing: true
          }
        }
      }
    }
  },
  {
    description: "If already inflated we just set frame to 0",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [dummyDemoDef.initial, dummyDemoDef.initial],
            anims: {},
            frame: 5,
            inflated: true
          }
        }
      }
    },
    payload: {
      demo: dummyDemoDef,
      gameId: "amazons" as GameId
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [dummyDemoDef.initial, dummyDemoDef.initial],
            anims: {},
            frame: 0,
            inflated: true,
            playing: true
          }
        }
      }
    }
  }
]);
