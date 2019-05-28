import { boardConnections } from "./";
import { AlgolOffset } from "algol-types";

describe("common/boardConnections", () => {
  test("can do basic positions", () => {
    const res = boardConnections({ height: 3, width: 3 });
    expect(res.a3).toEqual({ 3: "b3", 4: "b2", 5: "a2" });
  });
  test("can do basic offsets", () => {
    const offset: AlgolOffset = [[3], 2, 1]; // east, 2 steps forward, 1 step right
    const res = boardConnections({ height: 3, width: 3, offset });
    expect(res.a2.d3f2r1).toBe("c1");
  });
  test("can do offsets with dir shorts", () => {
    const offset: AlgolOffset = ["ortho", 2, 1]; // east, 2 steps forward, 1 step right
    const res = boardConnections({ height: 3, width: 3, offset });
    expect(res.a2.d3f2r1).toBe("c1");
  });
  test("can do offsets with megashort", () => {
    const offset: AlgolOffset = "knight";
    const res = boardConnections({ height: 3, width: 3, offset });
    expect(res.a3.d3f2r1).toBe("c2");
    expect(res.b3["d5f2r-1"]).toBe("c1");
    expect(res.b3["d5f2r1"]).toBe("a1");
  });
});
