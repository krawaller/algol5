import { emptyFullDef } from "../";
import { FullDefAnon } from "../../types";
import { actionLinks } from "./";

const def: FullDefAnon = {
  ...emptyFullDef,
  flow: {
    ...emptyFullDef.flow,
    startTurn: {
      link: { playercase: ["foo", "bar"] }
    }
  }
};

const tests: [string, 1 | 2, string[]][] = [
  ["startTurn", 1, ["foo"]],
  ["startTurn", 2, ["bar"]]
];

test("actionLinks", () =>
  tests.forEach(([action, plr, expected]) =>
    expect(actionLinks(def, plr, action)).toEqual(expected)
  ));
