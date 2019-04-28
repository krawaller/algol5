export function defaultInstruction(plr) {
  return {
    line: [
      { text: "Press " },
      { command: "endTurn" },
      {
        text: ` to submit your moves and hand over to `
      },
      {
        player: plr === 1 ? 2 : 1
      }
    ]
  };
}
