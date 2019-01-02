const fs = require("fs-extra");
const path = require("path");

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
export type ${capId}Phase = "startTurn" | ${capId}Command | ${capId}Mark;
`
  );
}
