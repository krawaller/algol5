import {
  blankArtifactLayers,
  generatorLayers,
  possibilities,
  blankUnitLayers,
  isTerrainLayerRef
} from "./utils";
import { FullDefAnon } from "./types";
import * as isArray from "lodash/isArray";
import makeParser from "./expressions";

export function copyArtifactsForAction(gameDef: FullDefAnon, actionDef) {
  let actionlayers = Object.keys(
    (actionDef.runGenerators || [])
      .concat(actionDef.runGenerator ? [actionDef.runGenerator] : [])
      .reduce((mem, gen) => {
        let gens = possibilities(gen);
        gens.forEach(gen => {
          mem = Object.assign(mem, generatorLayers(gameDef.generators[gen]));
        });
        return mem;
      }, {})
  );
  let ret = "{";
  ret += actionlayers
    .map(l => l + ": Object.assign({},step.ARTIFACTS." + l + ")")
    .join(", ");
  ret += "}";
  if (
    actionlayers.length === Object.keys(blankArtifactLayers(gameDef)).length
  ) {
    return ret;
  } else {
    return "Object.assign({},step.ARTIFACTS," + ret + ")";
  }
}

export function layerRef(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  layername
) {
  const parse = makeParser(gameDef, player, action);
  if (isArray(layername)) {
    layername = parse.val(layername);
  }
  var bag = { board: 1, light: 1, dark: 1 }[layername]
    ? "BOARD"
    : blankUnitLayers(gameDef)[layername]
    ? "UNITLAYERS"
    : isTerrainLayerRef(gameDef, layername)
    ? "TERRAIN"
    : "ARTIFACTS";
  return layername[0].match(/[a-z]/)
    ? bag + "." + layername
    : bag + "[" + layername + "]"; // TODO - what is this last bit?
}

export function calculateUnitLayers(
  gameDef: FullDefAnon,
  player: 1 | 2,
  defineVariable: boolean
) {
  return `
    ${defineVariable ? "let " : ""}UNITLAYERS = ${JSON.stringify(
    blankUnitLayers(gameDef)
  )};
    for (let unitid in UNITDATA) {
        let currentunit = UNITDATA[unitid]
        let unitgroup = currentunit.group;
        let unitpos = currentunit.pos;
        let owner = ownernames[currentunit.owner]
        UNITLAYERS.units[unitpos]
            = UNITLAYERS[unitgroup][unitpos]
            = UNITLAYERS[owner + unitgroup][unitpos]
            = UNITLAYERS[owner +'units'][unitpos]
            = currentunit;
    }
  `;
}
