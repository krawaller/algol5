import {
  AlgolGameTestSuite,
  AlgolGame,
  AlgolStep,
  AlgolStepLinks,
  isAlgolInstrLine,
  AlgolContentLineAnon
} from "../../types";
import { getContentText } from "../../common";

export function runGameScript(
  id: string,
  game: AlgolGame,
  scripts: AlgolGameTestSuite<string, string>,
  debug?: boolean
) {
  for (const scriptName in scripts) {
    test(`Game - ${id} - ${scriptName}`, () => {
      const lines = scripts[scriptName];
      let step: AlgolStep = game.newBattle();
      let n = 0;
      let lastFunc = "startTurn1";
      while (lines.length) {
        n++;
        const line = lines.shift();
        for (const action of line.commands) {
          let func;
          if (
            ["win", "lose", "draw"].includes(action) ||
            (action === "endTurn" &&
              ["win", "lose", "draw"].includes(step.LINKS.endGame))
          ) {
            if (lines.length) {
              throw new Error("Game end but lines remaining");
            }
            if (["startTurn1", "startTurn2"].includes(step.LINKS.endTurn)) {
              throw new Error("Expected game to end but it didnt");
            }
            if (step.LINKS.endGame !== action) {
              throw new Error(
                `Game ended with unexpected winner: ${action} vs ${
                  step.LINKS.endTurn
                }`
              );
            }
          } else {
            if (action === "endTurn") {
              func = step.LINKS.endTurn;
            } else {
              func = step.LINKS.actions[action];
            }
            if (!func) {
              console.log("OH NO", step.LINKS);
              throw new Error(
                "Failed to find function! " + JSON.stringify({ action, func })
              );
            } else {
              if (debug)
                console.log("N", n, "ACTION", action, "FUNCTION", func);
              const instr = game.instruction[lastFunc](step);
              const text = getContentText(instr);
              if (action.match(/^[a-z]{1,2}[0-9]{1,2}$/)) {
                expect(text.toLowerCase()).toMatch("select");
              } else if (
                action === "endTurn" ||
                action === step.LINKS.endTurn
              ) {
                expect((instr as AlgolContentLineAnon).line).toContainEqual({
                  command: "endTurn"
                });
              } else {
                expect((instr as AlgolContentLineAnon).line).toContainEqual({
                  command: action
                });
              }

              step = game.action[func](step, action);
              lastFunc = func;
            }
          }
        }
        if (debug) console.log("Checking", n, "turn", step.TURN);
        const availableActions = getAvailableActions(step.LINKS);
        if (line.include) {
          for (const inc of line.include) {
            expect(availableActions).toContain(inc);
          }
        }
        if (line.exclude) {
          for (const exc of line.exclude) {
            expect(availableActions).not.toContain(exc);
          }
        }
      }
    });
  }
}

function getAvailableActions(links: AlgolStepLinks) {
  return Object.keys(links.actions)
    .concat(links.endTurn || [])
    .concat(links.endGame || []);
}
