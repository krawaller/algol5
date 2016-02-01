import _ from "lodash";
import C from "./core";

/*
Effect methods will all mutate UNITDATA, which is assumed to have been
previously copied
*/
const effects = {
    swap: (O,pos1,pos2)=> (
        'var swappos1='+C.position(O,pos1)+'; '+
        'var swappos2='+C.position(O,pos2)+'; '+
        '(UNITDATA[ (LAYERS.units[swappos1] || {}).id ] || {}).pos=swappos2;'+
        '(UNITDATA[ (LAYERS.units[swappos2] || {}).id ] || {}).pos=swappos1;'
    ),
    killid: (O,id)=> "UNITDATA["+C.id(O,id)+"].dead=true;",
    moveid: (O,id,pos)=> "UNITDATA["+C.id(O,id)+"].pos="+C.position(O,pos)+";",
    setid: (O,id,propname,val)=> "UNITDATA["+C.id(O,id)+"]["+C.value(O,propname)+"]="+C.value(O,val)+";",
    kill1at: (O,pos)=> "(UNITDATA[ (LAYERS.units["+C.position(O,pos)+"] || {}).id ] || {}).dead=true;",
    move1at: (O,from,to)=> "(UNITDATA[ (LAYERS.units["+C.position(O,from)+"] || {}).id ] || {}).pos="+C.position(O,to)+";",
    set1at: (O,pos,propname,val)=> "(UNITDATA[ (LAYERS.units["+C.position(O,pos)+"] || {}).id ] || {})["+C.value(O,propname)+"]="+C.value(O,val)+";",
    spawn: (O,pos,group,owner,obj)=>{
        let id = "ID"+(""+Math.random()).replace("\.","");
        return (
            "var "+id+" = 'unit'+(Object.keys(UNITDATA).length+1);"+
            "UNITDATA["+id+"] = {pos:"+C.position(O,pos)+", id:"+id+",group:"+C.value(O,group)+",owner:"+(owner ? C.value(O,owner) : O.player)+(obj?","+_.map(obj,(val,key)=>key+":"+C.value(O,val)).join(","):"")+"};"
        );
    }
}

export default effects