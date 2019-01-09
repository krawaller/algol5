import playerClosure from "./playerclosure";
import { FullDef } from "./types";
import preProcess from "./preprocess";
import {
  isTerrainNeutral,
  contains,
  usesTurnVars,
  usesBattleVars,
  blankArtifactLayers
} from "./utils";

// TODO - remove some shit from game.blah ?

export default function compileGameCode(def: FullDef) {
  const gameId = def.meta.id;
  def = preProcess(def);
  return `
import fullDef from '../../games/dist/games/${gameId}';
import { relativedirs, reduce, pos2coords, coords2pos, boardPositions, offsetPos, posConnections, boardConnections, boardLayers, convertToEntities, deduceInitialUnitData, terrainLayers, mergeStrings, collapseLine } from '../../common';
      let game: any = {};
      const emptyArtifactLayer = ${JSON.stringify(blankArtifactLayers(def))};
      game.commands = ${JSON.stringify(
        Object.keys(def.flow.commands).reduce((mem, c) => {
          mem[c] = 1;
          return mem;
        }, {})
      )};
      game.graphics = ${JSON.stringify(def.graphics)};
      game.board = ${JSON.stringify(def.board)};
      game.AI = ${JSON.stringify(Object.keys((def.AI && def.AI.brains) || {}))};
      game.id = "${def.meta.id}";
      let connections = boardConnections(fullDef.board);
      let BOARD = boardLayers(fullDef.board);
      ${
        isTerrainNeutral(def)
          ? `let TERRAIN = terrainLayers(fullDef.board, 0${
              def.AI && def.AI.terrain
                ? `, ${JSON.stringify(def.AI.terrain)}`
                : ""
            }); `
          : ""
      }
      game.newGame = function(){
        let turnseed = { turn: 0 };
        let stepseed = {
          UNITDATA: deduceInitialUnitData(fullDef.setup)
          ${usesTurnVars(def) ? ", TURNVARS: {}" : ""}
          ${usesBattleVars(def) ? ", BATTLEVARS: {}" : ""}
          ${
            contains(def, "spawn") || contains(def, "spawnin")
              ? ", clones: 0"
              : ""
          }
        };
        return game.start1(turnseed,stepseed);
      };
      game.debug = function(){
        return {
          BOARD: BOARD,
          connections: connections,
          plr1: game.debug1(),
          plr2: game.debug2()
        };
      };

      ${playerClosure(def, 1)}
      ${playerClosure(def, 2)}

      export default game;
  `;
}
