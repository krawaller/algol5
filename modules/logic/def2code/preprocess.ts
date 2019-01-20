/*
Used in the `generate.js` build script to preprocess individual
game definitions.

TODO
 - add id to metadata
 - add AI list to metadata (or have it already there with desc?)
*/

import { FullDefAnon } from "./types";
import * as fs from "fs";
import { possibilities } from "./utils";

import * as mapValues from "lodash/mapValues";

// Flow information right now used in logic building (flow_mark.js)
function mapFlow(game: FullDefAnon) {
  let actions = [
    { name: "start", def: game.flow.startTurn, type: "start", path: [] }
  ];
  while (actions.length) {
    let { name, def, type, path } = actions.shift();
    (def.link ? [def.link] : [])
      .concat(def.links || [])
      .reduce((mem, l) => mem.concat(possibilities(l)), [])
      .filter(l => l !== "endturn")
      .forEach(targetName => {
        let targetType = game.flow.marks[targetName] ? "mark" : "command";
        let targetDef = game.flow[targetType + "s"][targetName];
        if (targetDef.flow) {
          targetDef.flow = "cyclic";
        } else {
          targetDef.flow = path.concat({ name, type });
          actions.push({
            name: targetName,
            type: targetType,
            def: targetDef,
            path: path.concat({ name, type })
          });
        }
      });
  }
  game.flow.flow = actions;
  return game;
}

function augmentSingleGenerator(genDef) {
  if (
    (genDef.type === "walker" || genDef.type === "neighbour") &&
    !genDef.dir &&
    !genDef.dirs
  ) {
    genDef.dirs = [1, 2, 3, 4, 5, 6, 7, 8];
  }
  return genDef;
}

function augmentGenerators(gameDef: FullDefAnon) {
  if (!gameDef.generators) {
    gameDef.generators = {};
  }
  gameDef.generators = mapValues(gameDef.generators, augmentSingleGenerator);
  if (gameDef.AI && gameDef.AI.generators) {
    gameDef.AI.generators = mapValues(
      gameDef.AI.generators,
      augmentSingleGenerator
    );
  }
  return gameDef;
}

export default function preProcess(def: FullDefAnon) {
  def = mapFlow(def);
  def = augmentGenerators(def);
  def.meta = def.meta || {};
  def.meta.instructions = def.meta.instructions || {};
  return def;
}
