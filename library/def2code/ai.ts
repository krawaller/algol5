import * as reduce from 'lodash/reduce';

import value from './expressions/value';

import {coords2pos, generatorLayers} from './utils';

import { Definition } from './types';
import {executeGenerator} from './artifacts/generate';


function calculateBrainScore(gameDef: Definition, player: 1 | 2, brain: string){
  let aspects = gameDef.AI.aspects;
  let plus = reduce(gameDef.AI.brains[brain].plus,(mem,weight,name)=>
      mem.concat( (weight === 1 ? '' : weight+' * ')+value(gameDef,player,brain,aspects[name]) )
  ,[]).join(' + ');
  let minus = reduce(gameDef.AI.brains[brain].minus,(mem,weight,name)=>
      mem + ' - ' + (weight === 1 ? '' : weight+' * ')+value(gameDef,player,brain,aspects[name])
  ,'');
  return plus + minus;
}

function calculateDetailedBrainScore(gameDef: Definition, player: 1 | 2, brain: string){
  let aspects = gameDef.AI.aspects
  let plus = reduce(gameDef.AI.brains[brain].plus,(mem,weight,name)=>
      mem.concat(name+': '+(weight === 1 ? '' : weight+' * ')+value(gameDef,player,brain,aspects[name]))
  ,[])
  let minus = reduce(gameDef.AI.brains[brain].minus,(mem,weight,name)=>
      mem.concat(name+': -'+(weight === 1 ? '' : weight+' * ')+value(gameDef,player,brain,aspects[name]))
  ,[])
  return '{'+plus.concat(minus).join(', ')+'}'
}

function addBrain(gameDef: Definition, player: 1 | 2, brain: string){
  const brainPrep = `
    var UNITLAYERS = step.UNITLAYERS;
    var ARTIFACTS = step.ARTIFACTS;
    ${ (gameDef.AI.brains[brain].generators||[]).reduce((mem,genname)=>{
      return mem.concat(Object.keys(generatorLayers(gameDef.AI.generators[genname])))
      },[]).map(l=> 'ARTIFACTS.'+l+' = {}; ').join('')
    }
  `;
  const brainGenerators = (gameDef.AI.brains[brain].generators||[]).reduce((mem,genname)=>
      mem + executeGenerator(gameDef, player, brain, gameDef.AI.generators[genname])
  ,'');
  return `
    game.brain_${brain}_${player} = function(step){
      ${brainPrep}
      ${brainGenerators}
      return ${calculateBrainScore(gameDef, player, brain)};
    };
    game.brain_${brain}_${player}_detailed = function(step){
      ${brainPrep}
      ${brainGenerators}
      return ${calculateDetailedBrainScore(gameDef, player, brain)};
    };
  `;
}

function scoring(scoreDef){
  return JSON.stringify(
    scoreDef.reduce((mem,row,r)=>row.reduce((m,val,c)=>(
      {[coords2pos({x:c+1,y:scoreDef.length-r})]: (val || 0), ...m}
    ),mem),{})
  );
}

export default function addAI(gameDef: Definition, player: 1 | 2){
  const scorings = reduce(gameDef.AI && gameDef.AI.scorings,
    (str,def,name)=> {
      let names = (player === 1 ? ['my'+name,'opp'+name] : ['opp'+name,'my'+name])
      let plr2def = (def[1] === 'mirror' ? def[0].slice().reverse() : def[1])
      return str + `
        var ${names[0]} = ${scoring(def[0])};
        var ${names[1]} = ${scoring(plr2def)};
      `;
    },
    ''
  );
  const brains = reduce(gameDef.AI && gameDef.AI.brains, (mem, def, name)=> mem + addBrain(gameDef, player, name), '');
  return scorings + brains;
}
