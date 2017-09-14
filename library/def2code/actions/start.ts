import value from '../expressions/value';

import { Definition } from '../types';
import {ifCodeContains,usesTurnVars,contains,blankArtifactLayers} from '../utils';
import { calculateUnitLayers } from '../common';
import applyLinkInstructions from './link';
import applyGenerators from '../artifacts/generate';

export default function addStartFunction(def: Definition, player: 1 | 2){
  const startDef = def.startTurn || {};
  const instruction = value(def, player, "start", startDef.instruction||'');
  return `
    game.start${player} = function(turn,step){
      var turn = {
        steps: {},
        player: player,
        turn: turn.turn+1,
        links: {root:{}}
      };

      var MARKS = {}; 
      var ARTIFACTS = ${JSON.stringify(blankArtifactLayers(def))};
      var UNITDATA = step.UNITDATA;
      ${usesTurnVars(def) ? 'var TURNVARS = {}; ' : ''}
      ${calculateUnitLayers(def, player, true)}
      ${applyGenerators(def,startDef,player,"startturn")}
      var newstep = turn.steps.root = {
        ARTIFACTS: ARTIFACTS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        MARKS: MARKS,
        stepid: 'root',
        name: 'start',
        ${contains(def,'spawn') ? 'clones: step.clones, ' : ''}
        path: []
        ${usesTurnVars(def) ? ',TURNVARS: TURNVARS ' : ''}
      };

      ${applyLinkInstructions(def, player, 'start', startDef, true)}

      return turn;
    }
    game.start${player}instruction = function(step){
      ${ifCodeContains(instruction,{
        MARKS: 'var MARKS = step.MARKS; ',
        ARTIFACTS: 'var ARTIFACTS = step.ARTIFACTS; ',
        UNITLAYERS: 'var UNITLAYERS = step.UNITLAYERS; ',
        UNITDATA: 'var UNITDATA = step.UNITDATA; ',
      })}
      return ${instruction};
    };
  `;
}
