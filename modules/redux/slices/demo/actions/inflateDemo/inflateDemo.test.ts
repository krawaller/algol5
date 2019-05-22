import { inflateDemo } from "./";
import { AlgolDemo } from "../../../../../types";
import { testCreator } from "../../../../utils";
import { GameId } from "../../../../../games/dist/list";

testCreator(inflateDemo, [
  {
    description: "Inflating adds the new positions and sets inflated to true",
    previous: {
      demo: {
        demos: {
          amazons: {
            positions: [{}],
            anims: {},
            frame: 0,
            inflated: false,
            playing: true
          }
        }
      }
    },
    payload: {
      gameId: "amazons" as GameId,
      positions: [
        <const>{ unit1: { pos: "a1", group: "pawns", id: "unit1", owner: 1 } }
      ]
    },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [
              {},
              <const>{
                unit1: { pos: "a1", group: "pawns", id: "unit1", owner: 1 }
              }
            ],
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
    description: "Inflating doesn't do anything if already inflated",
    previous: {
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
    },
    payload: {
      gameId: "amazons" as GameId,
      positions: [
        <const>{ unit1: { pos: "a1", group: "pawns", id: "unit1", owner: 1 } }
      ]
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
  }
]);
