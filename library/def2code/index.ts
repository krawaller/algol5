
import playerClosure from './playerclosure';
import { Definition } from './types';
import preProcess from './preprocess';
import { isTerrainNeutral, contains, usesTurnVars, usesBattleVars } from './utils';

// TODO - remove some shit from game.blah ?

export default function compileGameCode(def: Definition){
  def = preProcess(def);
  return `
    function(){
      var game = {};
      game.commands = ${JSON.stringify(Object.keys(def.commands).reduce((mem,c)=>{ mem[c] = 1; return mem; },{}))};
      game.graphics = ${JSON.stringify(def.graphics)};
      game.board = ${JSON.stringify(def.board)};
      game.AI = ${JSON.stringify(Object.keys(def.AI && def.AI.brains||{}))};
      game.id = "${def.meta.id}";
      var boardDef = ${JSON.stringify(def.board)};
      var connections = boardConnections(boardDef);
      var BOARD = boardLayers(boardDef);
      var relativedirs = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
      ${isTerrainNeutral(def) ? `var TERRAIN = terrainLayers(boardDef, 0${def.AI && def.AI.terrain ? `, ${JSON.stringify(def.AI.terrain)}` : ''}); ` : ''}

      function reduce(coll,iterator,acc){
        for(var key in coll){
          acc = iterator(acc,coll[key],key);
        }
        return acc;
      }
      game.newGame = function(){
        var turnseed = { turn: 0 };
        var stepseed = {
          UNITDATA: deduceInitialUnitData(${JSON.stringify(def.setup || {})})
          ${usesTurnVars(def) ? ', TURNVARS: {}' : ''}
          ${usesBattleVars(def) ? ', BATTLEVARS: {}' : ''}
          ${contains(def,'spawn') || contains(def,'spawnin') ? ', clones: 0' : ''}
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

      return game;
    }
  `
}
