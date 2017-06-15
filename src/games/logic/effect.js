import tail from "lodash/tail"
import map from "lodash/map"

/*
Effect methods will all mutate UNITDATA, which is assumed to have been
previously copied.
Only pushid, setid and setat actually manipulates individual unit objects, and they make copies

setturnvar and setturnpos mutates TURNVARS
*/

export default C => Object.assign(C,{
    applyeffect: (O,def)=> {
        if (!C[def[0]]){
            console.log(def);
            throw "Unknown effect! "+def
        }
        return C[def[0]].apply(C,[O].concat(tail(def)));
    },
    swap: (O,pos1,pos2)=> (
        C.setat(O,pos1,'pos',['pos',pos2])+
        C.setat(O,pos2,'pos',['pos',pos1])
    ),
    moveid: (O,id,pos)=> C.setid(O,id,'pos',['pos',pos]),
    moveat: (O,from,to,and)=> C.setat(O,from,'pos',['pos',to],and),
    stompid: (O,id,pos)=> C.moveid(O,id,pos)+' '+C.killat(O,pos),
    stompat: (O,from,to)=> C.moveat(O,from,to,['killat',to]),
    killid: (O,id)=> "delete UNITDATA["+C.id(O,id)+"]; ",
    killat: (O,pos)=> "delete UNITDATA[ (UNITLAYERS.units["+C.position(O,pos)+"] || {}).id ]; ",
    killin: (O,set)=> C.foridin(O,set,['killid',['loopid']]),
    setid: (O,id,propname,val)=> `
        UNITDATA[${C.id(O,id)}]=Object.assign({},UNITDATA[${C.id(O,id)}],{
            ${C.value(O,propname)}: ${C.value(O,val)}
        });
    `,
    setat: (O,pos,propname,val,and)=> `
        var unitid = (UNITLAYERS.units[${C.position(O,pos)}] || {}).id;
        if (unitid){
            UNITDATA[unitid]=Object.assign({},UNITDATA[unitid],{${C.value(O,propname)}:${C.value(O,val)}});
            ${and ? C.applyeffect(O,and) : ''}
        }
    `,
    setturnvar: (O,name,val)=> `
        TURNVARS[${C.value(O,name)}] = ${C.value(O,val)};
    `,
    setturnpos: (O,name,pos)=> `
        TURNVARS[${C.value(O,name)}] = ${C.position(O,pos)};
    `,
    setin: (O,set,propname,val)=> C.foridin(O,set,['setid',['loopid'],propname,val]),
    spawn: (O,pos,group,owner,obj)=>`
        var newunitid = 'spawn'+(clones++);
        UNITDATA[newunitid] = {
            pos: ${C.position(O,pos)},
            id: newunitid,
            group: ${C.value(O,group)},
            owner: ${owner !== undefined ? C.value(O,owner) : 'player'}
            ${obj?","+map(obj,(val,key)=>key+":"+C.value(O,val)).join(","):""}
        }; 
    `,
    forposin: (O,set,effect)=> `
        for(var POS in ${C.set(O,set)}){
            ${C.applyeffect(O,effect)}
        }
    `,
    foridin: (O,set,effect)=> {
        let ret = '',
            setcode = C.set(O,set),
            obvious = setcode.substr(0,10) === 'UNITLAYERS'
        return `
            var LOOPID;
            for(var POS in ${setcode}){
                ${obvious ? 'LOOPID='+setcode+'[POS].id' : 'if (LOOPID=(UNITLAYERS.units[POS]||{}).id){' }
                ${C.applyeffect(O,effect) /*TODO - check that it uses ['loopid'] ? */}
                ${!obvious ? '}' : '' }
            }
        `
    },
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
    `,
    pushin: (O,set,dir,dist)=> C.foridin(O,set,['pushid',['loopid'],dir,dist]),
})



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

