import { initDemo } from "./";
import { AlgolDemo } from "../../../../../types";
import { testCreator } from "../../../../utils";

const dummyDemoDef: AlgolDemo = {
  anims: { 0: { exitTo: { a1: "b2" } } },
  initial: { unit1: { pos: "a1", group: "pawns", id: "unit1", owner: 1 } },
  patches: []
};

testCreator(initDemo, [
  {
    description: "Initiating from nothing creates new uninflated entry",
    payload: {
      gameId: "amazons",
      demo: dummyDemoDef
    },
    previous: { demo: { demos: {} } },
    expected: {
      demo: {
        demos: {
          amazons: {
            positions: [dummyDemoDef.initial],
            anims: dummyDemoDef.anims,
            frame: 0,
            inflated: false
          }
        }
      }
    }
  }
]);
