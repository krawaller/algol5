const fs = require("fs-extra");
const path = require("path");
import { FullDef } from "./types";

function possibles(def) {
  if (typeof def === "string") return [def];
  switch (def[0]) {
    case "ifplayer":
      return possibles(def[2]);
    case "playercase":
      return possibles(def[1]).concat(possibles(def[2]));
    case "if":
      return possibles(def[2]);
    case "ifelse":
      return possibles(def[2]).concat(possibles(def[3]));
    case "indexlist":
      return possibles(def[2]);
    default:
      return def;
  }
}

export default function analyze(def: FullDef) {
  const gameId = def.meta.id;
  const defPath = path.join(__dirname, "./definitions", gameId);
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  const { board, graphics, generators, flow } = def;
  const terrains = Object.keys(board.terrain || {});
  const units = Object.keys(graphics.icons);
  const marks = Object.keys(flow.marks);
  const commands = Object.keys(flow.commands);
  const nonEndCommands = commands.filter(
    c =>
      possibles(flow.commands[c].link).filter(l => l !== "endturn").length > 0
  );

  function ownify(u) {
    return [u, "my" + u, "neutral" + u, "opp" + u];
  }

  const unitLayers = units.reduce((mem, u) => mem.concat(ownify(u)), []);

  let terrainLayers = [];
  for (let tname of terrains) {
    const t = board.terrain[tname];
    terrainLayers.push(tname);
    terrainLayers.push("no" + tname);
    if (!Array.isArray(t)) {
      if (t[0]) terrainLayers.push("neutral" + tname);
      if (t[1] || t[2]) {
        terrainLayers.push("my" + tname);
        terrainLayers.push("opp" + tname);
      }
    }
  }

  const generatorNames = Object.keys(generators);
  let artifactLayers = [];

  for (let g of generatorNames) {
    const gen = generators[g];
    const draws = gen.type === "filter" ? { filter: gen } : gen.draw;
    for (let d of Object.keys(draws)) {
      const draw = draws[d];
      for (let l of possibles(draw.tolayer)) {
        if (draw.include && draw.include.owner) {
          artifactLayers = artifactLayers.concat(ownify(l));
        } else {
          artifactLayers = artifactLayers.concat(l);
        }
      }
    }
  }

  artifactLayers = artifactLayers.filter(
    (l, n) => artifactLayers.indexOf(l) === n
  );

  const analysis = `import { CommonLayer } from '../../types';

export type ${capId}Terrain = ${
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
export type ${capId}UnitLayer = ${
    unitLayers.length ? unitLayers.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Generator = ${
    generatorNames.length
      ? generatorNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}ArtifactLayer = ${
    artifactLayers.length
      ? artifactLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}TerrainLayer = ${
    terrainLayers.length
      ? terrainLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}Layer = CommonLayer${
    unitLayers.length ? ` | ${capId}UnitLayer` : ""
  }${artifactLayers.length ? ` | ${capId}ArtifactLayer` : ""}${
    terrainLayers.length ? ` | ${capId}TerrainLayer` : ""
  };
`;

  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(defPath, "_types.ts"), analysis, err => {
      resolve();
    });
  }).then(() => console.log("Analysed", gameId));
}
