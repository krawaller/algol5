import { analyseGame } from "./";
import goWithTheFloe from "../../games/definitions/gowiththefloe";
import amazons from "../../games/definitions/amazons";

describe("the analyseGame function (test with gowiththefloe)", () => {
  it("shows action usage per player", () => {
    const result = analyseGame(goWithTheFloe);
    expect(Object.keys(result[1])).toEqual([
      "startTurn",
      "selectunit",
      "selectmovetarget",
      "selectjumptarget",
      "move",
      "jump",
    ]);
    expect(Object.keys(result[2])).toEqual([
      "startTurn",
      "selectunit",
      "selectmovetarget",
      "selectjumptarget",
      "selecteattarget",
      "move",
      "jump",
      "eat",
    ]);
  });

  it("maps marks per action (test with amazons)", () => {
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
    expect(actions.selectunit.generators).toEqual(["findmovetargets"]);
    expect(actions.move.generators).toEqual(["findfiretargets"]);
  });

  it("maps used generators per action (test with gowiththefloe)", () => {
    const result = analyseGame(goWithTheFloe);
    expect(result[1].startTurn.generators).toEqual([]);
    expect(result[1].selectunit.generators).toEqual([
      "findmovetargets",
      "findjumptargets",
    ]);
    expect(result[2].selectunit.generators).toEqual([
      "findmovetargets",
      "findjumptargets",
      "findeattargets",
    ]);
    expect(result[1].selectmovetarget.generators).toEqual(["findcracks"]);
    expect(result[1].move.generators).toEqual(["findsealsmoves"]);
    expect(result[2].eat.generators).toEqual(["findsealsmoves"]);
  });

  it("maps added artifacts per action (test with gowiththefloe)", () => {
    const result = analyseGame(goWithTheFloe);
    expect(result[1].startTurn.addedArtifacts).toEqual([]);
    expect(result[1].selectunit.addedArtifacts).toEqual([
      "movetargets",
      "jumptargets",
    ]);
    expect(result[2].selectunit.addedArtifacts).toEqual([
      "movetargets",
      "jumptargets",
      "eattargets",
    ]);
    expect(result[1].selectmovetarget.addedArtifacts).toEqual(["cracks"]);
    expect(result[1].move.addedArtifacts).toEqual(["canmove"]);
    expect(result[2].eat.addedArtifacts).toEqual(["canmove"]);
  });

  it("maps previous artifacts per action (test with gowiththefloe)", () => {
    const result = analyseGame(goWithTheFloe);
    expect(result[1].startTurn.priorArtifacts).toEqual([]);
    expect(result[1].selectunit.priorArtifacts).toEqual([]);
    expect(result[1].selectmovetarget.priorArtifacts).toEqual([
      "movetargets",
      "jumptargets",
    ]);
    expect(result[1].move.priorArtifacts).toEqual([
      "movetargets",
      "jumptargets",
      "cracks",
    ]);

    expect(result[2].startTurn.priorArtifacts).toEqual([]);
    expect(result[2].selectunit.priorArtifacts).toEqual([]);
    expect(result[2].selectmovetarget.priorArtifacts).toEqual([
      "movetargets",
      "jumptargets",
      "eattargets",
    ]);
    expect(result[2].move.priorArtifacts).toEqual([
      "movetargets",
      "jumptargets",
      "eattargets",
      "cracks",
    ]);
    expect(result[2].selecteattarget.priorArtifacts).toEqual([
      "movetargets",
      "jumptargets",
      "eattargets",
    ]);
    expect(result[2].eat.priorArtifacts).toEqual([
      "movetargets",
      "jumptargets",
      "eattargets",
    ]);
  });
});
