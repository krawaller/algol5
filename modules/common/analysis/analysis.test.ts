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

  it("maps used generators per action (test with amazons)", () => {
    const result = analyseGame(amazons);
    const actions = result[1];
    expect(actions.startTurn.generators).toEqual([]);
    expect(actions.selectunit.generators).toEqual(["findtargets"]);
    expect(actions.move.generators).toEqual(["findtargets"]);
  });

  it("maps used generators per action (test with gowiththefloe)", () => {
    const result = analyseGame(goWithTheFloe);
    expect(result[1].startTurn.generators).toEqual([]);
    expect(result[1].selectunit.generators).toEqual(["findmovetargets"]);
    expect(result[2].selectunit.generators).toEqual([
      "findmovetargets",
      "findeattargets"
    ]);
    expect(result[1].selectmovetarget.generators).toEqual(["findcracks"]);
    expect(result[1].move.generators).toEqual(["findsealsmoves"]);
    expect(result[2].eat.generators).toEqual(["findsealsmoves"]);
  });
});
