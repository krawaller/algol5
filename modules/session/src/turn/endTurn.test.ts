import { makeTurnAction, newBattleTurn, endTurn } from ".";
import aries from "../../../logic/generated/aries";
import semaphor from "../../../logic/generated/semaphor";

test("turn/endTurn regular", () => {
  let turn = newBattleTurn(aries);
  const actions = ["d4", "g4", "move"];
  actions.forEach(action => (turn = makeTurnAction(aries, turn, action)));
  turn = endTurn(aries, turn);
  expect(turn.currentStepId).toBe("root");
  expect(Object.keys(turn.steps.root.LINKS.actions).sort()).toEqual([
    "e5",
    "e6",
    "e7",
    "e8",
    "f5",
    "g5",
    "h5"
  ]);
});

test("turn/endTurn win", () => {
  let turn = newBattleTurn(semaphor);
  semaphorWin.forEach(
    action =>
      (turn =
        action === "endTurn"
          ? endTurn(semaphor, turn)
          : makeTurnAction(semaphor, turn, action))
  );
  expect(turn.gameOver).toBe(true);
});

const semaphorWin = [
  "c2",
  "deploy",
  "endTurn",
  "c2",
  "promote",
  "endTurn",
  "c2",
  "promote",
  "endTurn",
  "b2",
  "deploy",
  "endTurn",
  "b2",
  "promote",
  "endTurn",
  "b2",
  "promote",
  "endTurn",
  "a2",
  "deploy",
  "endTurn",
  "a2",
  "promote",
  "endTurn",
  "a2",
  "promote",
  "endTurn"
];
