import {
  AlgolGameTestSuite,
  AlgolGame,
  AlgolStep,
  AlgolStepLinks,
  AlgolContentLineAnon,
  AlgolScriptLine,
} from "../../types";
import { getContentText } from "../../common";

const endGames = ["win", "lose", "draw"];

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
        const line = lines.shift() as AlgolScriptLine<string, string>;
        for (const action of line.commands) {
          let func;
          if (
            action === "endTurn" &&
            endGames.includes(step.LINKS.endGame as string)
          ) {
            if (lines.length) {
              throw new Error("Game end but lines remaining");
            }
            if (
              ["startTurn1", "startTurn2"].includes(
                step.LINKS.endTurn as string
              )
            ) {
              throw new Error("Expected game to end but it didnt");
            }
            if (action !== "endTurn") {
              throw new Error(
                `Game ended with unexpected winner: ${action} vs ${step.LINKS.endTurn}`
              );
            }
            if (line.endedBy) {
              expect(line.endedBy).toEqual(step.LINKS.endedBy);
            }
            if (line.endedIn) {
              expect(line.endedIn).toEqual(step.LINKS.endGame);
            }
          } else {
            if (action === "endTurn") {
              func = step.LINKS.endTurn;
            } else {
              func = step.LINKS.marks[action] || step.LINKS.commands[action];
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
              const text = getContentText(instr).toString();
              if (action.match(/^[a-z]{1,2}[0-9]{1,2}$/)) {
                expect(text.toLowerCase()).toMatch("select");
              } else if (
                action === "endTurn" ||
                action === step.LINKS.endTurn
              ) {
                expect((instr as AlgolContentLineAnon).line).toContainEqual({
                  endTurn: "end turn",
                });
              } else {
                expect((instr as AlgolContentLineAnon).line).toContainEqual({
                  command: action,
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
  return Object.keys(links.marks)
    .concat(Object.keys(links.commands))
    .concat(links.endTurn || [])
    .concat(links.endGame || []);
}
