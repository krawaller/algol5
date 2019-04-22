import { API, GameId } from "../../src";
import gameDefs from "../../../games/dist/lib";

// WIP

export async function makeDemo(gameId: GameId) {
  const scripts = gameDefs[gameId].scripts;
  const script = scripts.demo || scripts[Object.keys(scripts)[0]];
  const commands = script.reduce((mem, line) => mem.concat(line.commands), []);
  let ui = API.newBattle(gameId);
  while (commands.length) {
    const action = commands.shift();
    ui = API.makeBattleAction(
      ui.sessionId,
      action === "win" ? "endTurn" : action
    );
  }
  console.log("demo", ui);
}
