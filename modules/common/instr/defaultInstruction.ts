import { AlgolContentAnon } from "../../types";

export function defaultInstruction(plr): AlgolContentAnon {
  return {
    line: [
      { text: "Press " },
      { endTurn: "end turn" },
      {
        text: ` to submit your moves and hand over to `
      },
      {
        player: plr === 1 ? 2 : 1
      }
    ]
  };
}
