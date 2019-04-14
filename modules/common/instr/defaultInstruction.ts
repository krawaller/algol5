export function defaultInstruction(plr) {
  return {
    line: [
      { text: "Press " },
      { command: "endTurn" },
      {
        text: `to submit your moves and hand over to the ${
          plr === 1 ? "blue" : "red"
        } player!`
      }
    ]
  };
}
