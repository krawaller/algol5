import { analyseGame } from "./";
import goWithTheFloe from "../../games/definitions/gowiththefloe";
import amazons from "../../games/definitions/amazons";

const want = {
  uses: {
    selectunit: true,
    move: true
  }
};

describe("the analyseGame function", () => {
  it("shows action usage per player", () => {
    const result = analyseGame(goWithTheFloe);
    expect(Object.keys(result[1])).toEqual([
      "startTurn",
      "selectunit",
      "selectmovetarget",
      "move"
    ]);
    expect(Object.keys(result[2])).toEqual([
      "startTurn",
      "selectunit",
      "selectmovetarget",
      "selecteattarget",
      "move",
      "eat"
    ]);
  });

  it("maps marks per action", () => {
    const result = analyseGame(amazons);
    const actions = result[1];

    expect(actions.selectunit.priorMarks).toEqual([]);
    expect(actions.selectunit.addsMark).toEqual("selectunit");
    expect(actions.selectmovetarget.priorMarks).toEqual(["selectunit"]);
    expect(actions.selectmovetarget.addsMark).toEqual("selectmovetarget");
    expect(actions.move.priorMarks).toEqual(["selectunit", "selectmovetarget"]);
    expect(actions.move.isCmnd).toBe(true);
    expect(actions.selectfiretarget.priorMarks).toEqual([]);
    expect(actions.selectfiretarget.addsMark).toEqual("selectfiretarget");
    expect(actions.fire.priorMarks).toEqual(["selectfiretarget"]);
    expect(actions.fire.isCmnd).toBe(true);
  });
});
