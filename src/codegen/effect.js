import tail from "lodash/array/tail"
import map from "lodash/collection/map"

import C from "./core";

/*
Effect methods will all mutate UNITDATA, which is assumed to have been
previously copied.
Only setid and setat actually manipulates individual unit objects, and they make copies
*/
const E = {
    applyeffect: (O,def)=> E[def[0]].apply(E,[O].concat(tail(def))),
    swap: (O,pos1,pos2)=> (
        E.setat(O,pos1,'pos',['pos',pos2])+
        E.setat(O,pos2,'pos',['pos',pos1])
    ),
    moveid: (O,id,pos)=> E.setid(O,id,'pos',['pos',pos]),
    moveat: (O,from,to,and)=> E.setat(O,from,'pos',['pos',to],and),
    stompid: (O,id,pos)=> E.moveid(O,id,pos)+' '+E.killat(O,pos),
    stompat: (O,from,to)=> E.moveat(O,from,to,['killat',to]),
    killid: (O,id)=> "delete UNITDATA["+C.id(O,id)+"]; ",
    killat: (O,pos)=> "delete UNITDATA[ (UNITLAYERS.all["+C.position(O,pos)+"] || {}).id ]; ",
    killin: (O,set)=> E.foridin(O,set,['killid',['loopid']]),
    setid: (O,id,propname,val)=> `
        UNITDATA[${C.id(O,id)}]=Object.assign({},UNITDATA[${C.id(O,id)}],{
            ${C.value(O,propname)}: ${C.value(O,val)}
        });
    `,
    setat: (O,pos,propname,val,and)=> `
        var unitid = (UNITLAYERS.all[${C.position(O,pos)}] || {}).id;
        if (unitid){
            UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{${C.value(O,propname)}:${C.value(O,val)}});
            ${and ? E.applyeffect(O,and) : ''}
        }
    `,
    setin: (O,set,propname,val)=> E.foridin(O,set,['setid',['loopid'],propname,val]),
    spawn: (O,pos,group,owner,obj)=>`
        var newunitid = 'unit'+(nextunitid++);
        UNITDATA[newunitid] = {
            pos: ${C.position(O,pos)},
            id: newunitid,
            group: ${C.value(O,group)},
            owner: ${owner ? C.value(O,owner) : 'player'}
            ${obj?","+map(obj,(val,key)=>key+":"+C.value(O,val)).join(","):""}
        }; 
    `,
    forposin: (O,set,effect)=> `
        for(var POS in ${C.set(O,set)}){
            ${E.applyeffect(O,effect)}
        }
    `,
    foridin: (O,set,effect)=> {
        let ret = '',
            setcode = C.set(O,set),
            obvious = setcode.substr(0,10) === 'UNITLAYERS'
        return `
            var LOOPID;
            for(var POS in ${setcode}){
                ${obvious ? 'LOOPID='+setcode+'[POS].id' : 'if (LOOPID=(UNITLAYERS.all[POS]||{}).id){' }
                ${E.applyeffect(O,effect) /*TODO - check that it uses ['loopid'] ? */}
                ${!obvious ? '}' : '' }
            }
        `
    }
}

export default E