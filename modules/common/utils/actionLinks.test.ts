import { emptyFullDef } from "../";
import { FullDefAnon } from "../../types";
import { actionLinks } from "./";

const def: FullDefAnon = {
  ...emptyFullDef,
  flow: {
    ...emptyFullDef.flow,
    startTurn: {
      link: { playercase: ["foo", "bar"] },
    },
  },
};

const tests: [string, 1 | 2, string, string[]][] = [
  ["startTurn", 1, "basic", ["foo"]],
  ["startTurn", 2, "basic", ["bar"]],
];

test("actionLinks", () =>
  tests.forEach(([action, plr, ruleset, expected]) =>
    expect(actionLinks(def, plr, action, ruleset)).toEqual(expected)
  ));
