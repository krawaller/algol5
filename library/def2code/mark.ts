import lib from '../logic/';

import { Definition } from './types';

import {ifCodeContains} from './utils';

export default function addMarkFunction(def: Definition, markname: string, player: 1 | 2){
  const O = {rules: def, markname, player};
  const markDef = def.marks[markname];
  let newMarkObject = `Object.assign({},step.MARKS,{${markname}:markpos})`;
  if (markDef.flow !== 'cyclic'){
    let marksToKeep = markDef.flow.reduce((mem,p)=>{
      switch(p.type){
        case 'mark': return mem.concat(p.name)
        case 'command': return []
        default: return mem
      }
    },[]);
    newMarkObject = '{' + [markname+': markpos'].concat(marksToKeep.map(mname=> mname+": step.MARKS."+mname)).join(',')+'}';
  }
  const body = `
    var MARKS = ${newMarkObject}; 
    ${lib.applyGeneratorInstructions(O,markDef)}
  `;
  const linking = lib.applyLinkInstructions(O,markDef);
  const preludium = ifCodeContains(body + linking, {
    TURNVARS: 'var TURNVARS = step.TURNVARS; ',
    ARTIFACTS: 'var ARTIFACTS = ' + lib.copyArtifactsForAction(O,markDef) + '; ',
    UNITLAYERS: 'var UNITLAYERS = step.UNITLAYERS; '
  });
  const instruction = lib.value(O, markDef.instruction||'');
  return `
      game.${markname}${player} = function(turn,step,markpos){
        ${preludium}
        ${body}
        var newstepid = step.stepid+'-'+markpos;
        var newstep = turn.steps[newstepid] = Object.assign({},step,{
          ${lib.markGenerates(O) ? 'ARTIFACTS: ARTIFACTS,' : ''}
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: '${markname}'
        });
        turn.links[newstepid] = {};
        ${linking}
        return newstep;
      };
      game.${markname}${player}instruction = function(step){
        ${ifCodeContains(instruction,{
          MARKS: 'var MARKS = step.MARKS; ',
          ARTIFACTS: 'var ARTIFACTS = step.ARTIFACTS; ',
          UNITLAYERS: 'var UNITLAYERS = step.UNITLAYERS; ',
          UNITDATA: 'var UNITDATA = step.UNITDATA; ',
        })}
        return ${instruction};
      };
  `
}
