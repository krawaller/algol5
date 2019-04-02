import { GameTestSuite, AlgolStep } from "../../types";

export function runGameScript(
  id: string,
  game: any,
  scripts: GameTestSuite,
  debug?: boolean
) {
  for (const scriptName in scripts) {
    test(`Game - ${id} - ${scriptName}`, () => {
      const lines = scripts[scriptName];
      let step: any = game.newBattle();
      let n = 0;
      while (lines.length) {
        n++;
        const line = lines.shift();
        for (const action of line.commands) {
          let func;
          if (
            ["win", "lose", "draw"].includes(action) ||
            (action === "endturn" &&
              ["win", "lose", "draw"].includes(step.LINKS.endturn))
          ) {
            if (lines.length) {
              throw new Error("Game end but lines remaining");
            }
            if (step.LINKS.endturn !== action) {
              throw new Error("Game ended with unexpected winner");
            }
          } else {
            if (action === "endturn") {
              func = step.LINKS.endturn;
            } else if (step.LINKS.commands[action]) {
              func = step.LINKS.commands[action];
            } else {
              for (const markName in step.LINKS.marks) {
                if (step.LINKS.marks[markName].pos.includes(action)) {
                  func = step.LINKS.marks[markName].func;
                }
              }
            }
            if (!func) {
              throw new Error("Don't know what to do now! :/");
            } else {
              if (debug)
                console.log("N", n, "ACTION", action, "FUNCTION", func);
              step = game[func](step, action);
            }
          }
        }
        if (debug) console.log("Checking", n, "turn", step.TURN);
        const availableActions = Object.keys(step.LINKS.commands)
          .concat(
            Object.keys(step.LINKS.marks).reduce(
              (mem, markName) => mem.concat(step.LINKS.marks[markName].pos),
              []
            )
          )
          .concat(step.LINKS.endturn || []);
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
