const fs = require("fs-extra");
const path = require("path");

function possibles(def) {
  if (typeof def === "string") return [def];
  switch (def[0]) {
    case "if":
      return possibles(def[2]);
    case "ifelse":
      return possibles(def[2]).concat(possibles(def[3]));
    default:
      return def;
  }
}

export default function analyze(gameId) {
  const defPath = path.join(__dirname, "./definitions", gameId);
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  const board = require(path.join(defPath, "board.ts")).default;
  const terrains = Object.keys(board.terrain || {});
  const graphics = require(path.join(defPath, "graphics.ts")).default;
  const units = Object.keys(graphics.icons);
  const rules = require(path.join(defPath, "rules.ts")).default;
  const marks = Object.keys(rules.marks);
  const commands = Object.keys(rules.commands);
  const nonEndCommands = commands.filter(
    c =>
      possibles(rules.commands[c].link).filter(l => l !== "endturn").length > 0
  );

  fs.writeFileSync(
    path.join(defPath, "_types.ts"),
    `export type ${capId}Terrain = ${
      terrains.length ? terrains.map(t => `"${t}"`).join(" | ") : "never"
    };
export type ${capId}Unit = ${
      units.length ? units.map(t => `"${t}"`).join(" | ") : "never"
    };
export type ${capId}Mark = ${
      marks.length ? marks.map(t => `"${t}"`).join(" | ") : "never"
    };
export type ${capId}Command = ${
      commands.length ? commands.map(t => `"${t}"`).join(" | ") : "never"
    };
export type ${capId}PhaseCommand = ${
      nonEndCommands.length
        ? nonEndCommands.map(t => `"${t}"`).join(" | ")
        : "never"
    };
export type ${capId}Phase = "startTurn" | ${capId}Mark${
      nonEndCommands.length ? ` | ${capId}PhaseCommand` : ""
    };
`
  );
}
