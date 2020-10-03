import { boardPositions } from "..";
import { AlgolBoardAnon } from "../../types";
describe("boardPositions", () => {
  test("normal board", () => {
    const board = ({ height: 2, width: 3 } as unknown) as AlgolBoardAnon;
    const result = boardPositions(board);
    const expected = ["a1", "a2", "b1", "b2", "c1", "c2"];
    expect(result).toEqual(expected);
  });
  test("board with holes", () => {
    const board: AlgolBoardAnon = {
      height: 3,
      width: 3,
      holes: [{ rect: ["a1", "b2"] }, "c3"],
    };
    const result = boardPositions(board);
    const expected = ["a3", "b3", "c1", "c2"];
    expect(result).toEqual(expected);
  });
});
