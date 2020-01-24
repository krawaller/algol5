import { KriegBoard } from "./_types";

const kriegBoard: KriegBoard = {
  width: 4,
  height: 4,
  terrain: {
    southeast: ["a4", "c2"],
    northwest: ["b3", "d1"],
    corners: { "1": ["a4"], "2": ["d1"] },
    bases: { "1": ["b4", "a3", "b3"], "2": ["c2", "d2", "c1"] }
  }
};

export default kriegBoard;
