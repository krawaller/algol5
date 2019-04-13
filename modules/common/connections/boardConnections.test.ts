import { boardConnections } from "./";
import { AlgolBoard, AlgolOffset } from "../../types";

describe("common/boardConnections", () => {
  test("can do basic offsets", () => {
    const offset: AlgolOffset = [[3], 2, 1]; // east, 2 steps forward, 1 step right
    const res = boardConnections({ height: 3, width: 3, offset });
    //expect(res.a2);
  });
});
