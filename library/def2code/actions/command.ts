import { Definition } from '../types';
import applyLinkInstructions from './link';
import applyEffectInstructions from './effect';
import applyGeneratorInstructions from '../artifacts/generate';
import makeParser from '../expressions';
import {
  ifCodeContains,
  usesTurnVars,
  contains,
  blankArtifactLayers,
} from '../utils';

import {copyArtifactsForAction, calculateUnitLayers} from '../common';

export default function addCommandFunction(def: Definition, player: 1 | 2, cmndname: string){
  const parse = makeParser(def,player,cmndname);
  const cmndDef = def.commands[cmndname];
  const instruction = parse.val(cmndDef.instruction || '');
  return `
    game.${cmndname}${player} = function(turn,step){
      var ARTIFACTS = ${copyArtifactsForAction(def,cmndDef)};
      var MARKS = step.MARKS;
      var UNITDATA = Object.assign({},step.UNITDATA);
      ${contains(cmndDef,'spawn') ? 'var clones = step.clones; ' : ''}
      var UNITLAYERS = step.UNITLAYERS;
      ${usesTurnVars(cmndDef) ? 'var TURNVARS = Object.assign({},step.TURNVARS); ' : ''}

      ${applyEffectInstructions(def,player,cmndname,cmndDef)}
      MARKS = {};
      ${calculateUnitLayers(def, player, false)}
      ARTIFACTS = ${JSON.stringify(blankArtifactLayers(def))};
      ${applyGeneratorInstructions(def,player,cmndname,cmndDef)}

      var newstepid = step.stepid+'-'+'${cmndname}';
      var newstep = turn.steps[newstepid] = Object.assign({},step,{
        ARTIFACTS: ARTIFACTS,
        MARKS: MARKS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        stepid: newstepid,
        name: '${cmndname}',
        path: step.path.concat('${cmndname}')
        ${contains(cmndDef,'spawn') ? ', clones: clones' : ''}
        ${usesTurnVars(cmndDef) ? ',TURNVARS: TURNVARS ' : ''}
      });
      turn.links[newstepid] = {};

      ${applyLinkInstructions(def, player, cmndname, cmndDef, false)}

      return newstep;
    }
    game.${cmndname}${player}instruction = function(step){
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