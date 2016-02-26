import _ from "lodash";
import C from "./core";

/*
Effect methods will all mutate UNITDATA, which is assumed to have been
previously copied
*/
const E = {
    applyeffect: (O,def)=> E[def[0]].apply(E,[O].concat(_.tail(def))),
    swap: (O,pos1,pos2)=> (
        'var swappos1='+C.position(O,pos1)+'; '+
        'var swappos2='+C.position(O,pos2)+'; '+
        '(UNITDATA[ (UNITLAYERS.all[swappos1] || {}).id ] || {}).pos=swappos2;'+
        '(UNITDATA[ (UNITLAYERS.all[swappos2] || {}).id ] || {}).pos=swappos1;'
    ),
    moveid: (O,id,pos)=> "UNITDATA["+C.id(O,id)+"].pos="+C.position(O,pos)+";",
    moveat: (O,from,to)=> "(UNITDATA[ (UNITLAYERS.all["+C.position(O,from)+"] || {}).id ] || {}).pos="+C.position(O,to)+";",
    killid: (O,id)=> "UNITDATA["+C.id(O,id)+"].dead=true;",
    killat: (O,pos)=> "(UNITDATA[ (UNITLAYERS.all["+C.position(O,pos)+"] || {}).id ] || {}).dead=true;",
    killin: (O,set)=> E.foridin(O,set,['killid',['loopid']]),
    setid: (O,id,propname,val)=> "UNITDATA["+C.id(O,id)+"]["+C.value(O,propname)+"]="+C.value(O,val)+";",
    setat: (O,pos,propname,val)=> "(UNITDATA[ (UNITLAYERS.all["+C.position(O,pos)+"] || {}).id ] || {})["+C.value(O,propname)+"]="+C.value(O,val)+";",
    setin: (O,set,propname,val)=> E.foridin(O,set,['setid',['loopid'],propname,val]),
    spawn: (O,pos,group,owner,obj)=>{
        return (
            "var newunitid = 'unit'+(Object.keys(UNITDATA).length+1);"+
            "UNITDATA[newunitid] = {pos:"+C.position(O,pos)+", id:newunitid,group:"+C.value(O,group)+",owner:"+(owner ? C.value(O,owner) : O.player)+(obj?","+_.map(obj,(val,key)=>key+":"+C.value(O,val)).join(","):"")+"};"
        );
    },
    forposin: (O,set,effect)=> {
        let ret = '';
        ret += 'for(var POS in '+C.set(O,set)+'){'
        ret += E.applyeffect(O,effect); // TODO - check that it uses ['target'] ?
        ret += '}'
        return ret
    },
    foridin: (O,set,effect)=> {
        let ret = '',
            setcode = C.set(O,set),
            obvious = setcode.substr(0,10) === 'UNITLAYERS'
        ret += 'var LOOPID; '
        ret += 'for(var POS in '+setcode+'){'
        if (!obvious) ret += 'if (LOOPID=(UNITLAYERS.all[POS]||{}).id){'
        if (obvious) ret += 'LOOPID='+setcode+'[POS].id; '
        ret += E.applyeffect(O,effect)  // TODO - check that it uses ['loopid'] ?
        if (!obvious) ret += '}'
        ret += '}'
        return ret;
    }
}

export default E