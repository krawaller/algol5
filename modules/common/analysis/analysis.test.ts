import { analyseGame } from "./";
import goWithTheFloe from "../../games/definitions/gowiththefloe";

const want = {
  uses: {
    selectunit: true,
    move: true
  }
};

describe("the analyseGame function", () => {
  it("shows action usage per player", () => {
    const result = analyseGame(goWithTheFloe);
    expect(result[1].uses).toEqual({
      selectunit: true,
      selectmovetarget: true,
      move: true
    });
    expect(result[2].uses).toEqual({
      selectunit: true,
      selectmovetarget: true,
      selecteattarget: true,
      move: true,
      eat: true
    });
  });
});
