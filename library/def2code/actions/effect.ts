import * as map from 'lodash/map';

import { Definition } from '../types';
import obey from '../obey';
import makeExpr from '../expressions';

// TODO - add action name!!

/*
Effect methods will all mutate UNITDATA, which is assumed to have been
previously copied.
Only pushid, setid and setat actually manipulates individual unit objects, and they make copies

setturnvar and setturnpos mutates TURNVARS
setbattlevar and setbattlepos mutates BATTLEPOS
*/



/*
    applyeffect: (O,def)=> {
        if (!C[def[0]]){
            console.log(def);
            throw "Unknown effect! "+def
        }
        return C[def[0]].apply(C,[O].concat(tail(def)));
    },
*/

function executeEffect(gameDef: Definition, player: 1 | 2, action: string, effect: any): string {
  const expr = makeExpr(gameDef, player, action);
  const O = {rules: gameDef, player};
  const [type, ...args] = effect;
  switch(type){
    case "swap": {
      /*
      swap: (O,pos1,pos2)=> (
        C.setat(O,pos1,'pos',['pos',pos2])+
        C.setat(O,pos2,'pos',['pos',pos1])
      ), */
      const [pos1,pos2] = args;
      return (
        executeEffect(gameDef, player,action, ['setat',pos1,'pos',['pos', pos2]]) + ' ' +
        executeEffect(gameDef, player,action, ['setat',pos2,'pos',['pos', pos1]])
      );
    }
    case "moveid": { // "movebyid""
      /*
      moveid: (O,id,pos)=> C.setid(O,id,'pos',['pos',pos]),
      */
      const [id,pos] = args;
      return executeEffect(gameDef, player,action, ['setid',id,'pos',['pos',pos]]);
    }
    case "moveat": {
      /*
      moveat: (O,from,to,and)=> C.setat(O,from,'pos',['pos',to],and),
      */
      const [from,to,andThen] = args; // TODO - instead of then, just do double?
      return executeEffect(gameDef, player,action, ['setat',from,'pos',['pos',to],andThen]);
    }
    case "stompid": {// "stompbyid"
      /*
      stompid: (O,id,pos)=> C.moveid(O,id,pos)+' '+C.killat(O,pos),
      */
      const [id,pos] = args;
      return (
        executeEffect(gameDef, player,action, ['killat',pos]) + ' ' +
        executeEffect(gameDef, player,action, ['moveid',id,pos])
      );
    }
    case "stompat": {
      /*
      stompat: (O,from,to)=> C.moveat(O,from,to,['killat',to]),
      */
      const [from,to] = args; // TODO - instead of then, just do double?
      return executeEffect(gameDef, player,action, ['moveat', from, to, ['killat', to]]);
    }
    case "killid": { // "killbyid"
      /*
      killid: (O,id)=> "delete UNITDATA["+C.id(O,id)+"]; ",
      */
      const [id] = args;
      return `delete UNITDATA[${expr.id(id)}]; `;
    }
    case "killat": {
      /*
      killat: (O,pos)=> "delete UNITDATA[ (UNITLAYERS.units["+C.position(O,pos)+"] || {}).id ]; ",
      */
      const [pos] = args;
      return `delete UNITDATA[ (UNITLAYERS.units[${expr.position(pos)}] || {}).id ]; `;
    }
    case "killin": { // kill all in a set
      /*
      killin: (O,set)=> C.foridin(O,set,['killid',['loopid']]),
      */
      const [set] = args;
      return executeEffect(gameDef, player,action, ['foridin',set,['killid',['loopid']]]);
    }
    case "setid": { // set by id
      /*
      setid: (O,id,propname,val)=> `
        UNITDATA[${C.id(O,id)}]=Object.assign({},UNITDATA[${C.id(O,id)}],{
          ${C.value(O,propname)}: ${C.value(O,val)}
        });
      `,*/
      const [id,propname,val] = args;
      return `
        UNITDATA[${expr.id(id)}]=Object.assign({},UNITDATA[${expr.id(id)}],{
          ${expr.value(propname)}: ${expr.value(val)}
        });
      `;
    }
    case "setat": {
      /*
      setat: (O,pos,propname,val,and)=> `
        var unitid = (UNITLAYERS.units[${C.position(O,pos)}] || {}).id;
        if (unitid){
          UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{${C.value(O,propname)}:${C.value(O,val)}});
          ${and ? C.applyeffect(O,and) : ''}
        }
      `*/
      const [pos,propname,val,andThen] = args;
      return `
        var unitid = (UNITLAYERS.units[${expr.position(pos)}] || {}).id;
        if (unitid){
          UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{${expr.value(propname)}:${expr.value(val)}});
          ${andThen ? executeEffect(gameDef, player,action, andThen) : ''}
        }
      `;
    }
    case "setturnvar": {
      /*
      setturnvar: (O,name,val)=> `
        TURNVARS[${C.value(O,name)}] = ${C.value(O,val)};
      `,*/
      const [name,val] = args;
      return `TURNVARS[${expr.value(name)}] = ${expr.value(val)}; `;
    }
    case "setturnpos": {
      /*
      setturnpos: (O,name,pos)=> `
        TURNVARS[${C.value(O,name)}] = ${C.position(O,pos)};
      `,*/
      const [name,pos] = args;
      return `TURNVARS[${expr.value(name)}] = ${expr.position(pos)}; `;
    }
    case "setbattlevar": {
      const [name,val] = args;
      return `BATTLEVARS[${expr.value(name)}] = ${expr.value(val)}; `;
    }
    case "setbattlepos": {
      const [name,pos] = args;
      return `BATTLEVARS[${expr.value(name)}] = ${expr.position(pos)}; `;
    }
    case "setin": {
      /*
      setin: (O,set,propname,val)=> C.foridin(O,set,['setid',['loopid'],propname,val]),
      */
      const [set,propname,val] = args;
      return executeEffect(gameDef, player,action, ['foridin',set,['setid',['loopid'],propname,val]]);
    }
    case "spawnin": {
      const [set,group,owner,obj] = args;
      return executeEffect(gameDef, player, action, ['forposin',set,['spawn',['target'],group,owner,obj]]);
    }
    case "spawn": {
      /*
      spawn: (O,pos,group,owner,obj)=>`
        var newunitid = 'spawn'+(clones++);
        UNITDATA[newunitid] = {
          pos: ${C.position(O,pos)},
          id: newunitid,
          group: ${C.value(O,group)},
          owner: ${owner !== undefined ? C.value(O,owner) : 'player'}
          ${obj?","+map(obj,(val,key)=>key+":"+C.value(O,val)).join(","):""}
        }; 
      `,*/
      const [pos,group,owner,obj] = args;
      return `
        var newunitid = 'spawn'+(clones++);
        UNITDATA[newunitid] = {
          pos: ${expr.position(pos)},
          id: newunitid,
          group: ${expr.value(group)},
          owner: ${owner !== undefined ? expr.value(owner) : 'player' }
          ${obj?","+map(obj,(val,key)=>key+":"+expr.value(val)).join(","):""}
        }; 
      `;
    }
    case "forposin": {
      /*
      forposin: (O,set,effect)=> `
        for(var POS in ${C.set(O,set)}){
          ${C.applyeffect(O,effect)}
        }
      `*/
      const [set,effect] = args;
      return `
        for(var POS in ${expr.set(set)}){
          ${executeEffect(gameDef,player,action,effect)}
        }
      `;
    }
    case "foridin": {
      /*
      foridin: (O,set,effect)=> {
        let ret = '',
            setcode = C.set(O,set),
            obvious = setcode.substr(0,10) === 'UNITLAYERS'
        return `
          var LOOPID;
          for(var POS in ${setcode}){
            ${obvious ? 'LOOPID='+setcode+'[POS].id' : 'if (LOOPID=(UNITLAYERS.units[POS]||{}).id){' }
            ${C.applyeffect(O,effect)}  // TODO - check that it uses ['loopid'] ?
            ${!obvious ? '}' : '' }
          }
        `
      }*/
      const [set,effect] = args;
      const setcode = expr.set(set);
      const obvious = setcode.substr(0,10) === 'UNITLAYERS';
      return `
        var LOOPID;
        for(var POS in ${setcode}){
          ${obvious ? 'LOOPID='+setcode+'[POS].id' : 'if (LOOPID=(UNITLAYERS.units[POS]||{}).id){' }
          ${executeEffect(gameDef,player,action,effect)}  // TODO - check that it uses ['loopid'] ?
          ${!obvious ? '}' : '' }
        }
      `;
    }
    case "pushid": {
      /*
      pushid: (O,id,dir,dist)=> `
        var pushid = ${C.id(O,id)};
        var pushdir = ${C.value(O,dir)};
        var dist = ${C.value(O,dist)};
        var newpos = UNITDATA[pushid].pos;
        while(dist && connections[newpos][pushdir]){
            newpos = connections[newpos][pushdir];
            dist--;
        }
        UNITDATA[pushid]=Object.assign({},UNITDATA[pushid],{pos: newpos});
      `*/
      const [id,dir,dist] = args;
      return `
        var pushid = ${expr.id(id)};
        var pushdir = ${expr.value(dir)};
        var dist = ${expr.value(dist)};
        var newpos = UNITDATA[pushid].pos;
        while(dist && connections[newpos][pushdir]){
          newpos = connections[newpos][pushdir];
          dist--;
        }
        UNITDATA[pushid]=Object.assign({},UNITDATA[pushid],{pos: newpos});
      `;
    }
    case "pushin": {
      /*
      pushin: (O,set,dir,dist)=> C.foridin(O,set,['pushid',['loopid'],dir,dist]),
      */
      const [set,dir,dist] = args;
      return executeEffect(gameDef,player,action,['foridin',set,['pushid',['loopid'],dir,dist]]);
    }
    case "multi": {
      return args.map( e => executeEffect(gameDef,player,action,e) ).join('');
    }
    default:
      console.log("BAD EFFECT",effect);
      throw "Unknown effect! "+effect;
  }
}

export default function applyEffectInstructions(gameDef: Definition, player: 1 | 2, action: string, actionDef: any) {
  if (actionDef.applyEffects){
    return obey(gameDef, player, action, ['all'].concat(actionDef.applyEffects), (effect) => executeEffect(gameDef, player, action, effect));
  } else if (actionDef.applyEffect){
    return obey(gameDef, player, action, actionDef.applyEffect, (effect) => executeEffect(gameDef, player, action, effect));
  } else {
    return '';
  }
}


/*

offsetunit: function(state,id,dir,dist){
        id = this.evaluateId(state,id);
        dir = this.evaluateValue(state,dir);
        dist = this.evaluateValue(state,dist) || 0;
        var pos = state.getIn(["data","units",id,"pos"]);
        while(dist && state.hasIn(["connections",pos,dir])){
            pos = state.getIn(["connections",pos,dir]);
            dist--;
        }
        return state.setIn(["data","units",id,"pos"],pos);
    },
*/
