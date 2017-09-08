import * as tail from "lodash/tail";
import * as isArray from "lodash/isArray";
import * as reduce from "lodash/reduce";

export default T => {

    const universal = {
        ifelse: (datatype)=> (O,[bool,alt1,alt2])=> {
            if (typeof T[datatype] !== "function"){
                console.log("ODIWNFE",datatype,"FOO",typeof T[datatype],T[datatype])
            }
            return "(" + T.boolean(O,bool) + "?" + T[datatype](O,alt1) + ":" + T[datatype](O,alt2) + ")"
        },
        playercase: (datatype)=> (O,[alt1,alt2])=> T[datatype](O,O.player === 1 ? alt1 : alt2),
        actionor: (datatype)=> (O,[action,alt1,alt2])=> {
            if (!T[datatype]){
                console.log("ALARM",datatype)
            }
            return T[datatype](O,O.cmndname===action||O.markname===action||O.name===action||O.action===action?alt1:alt2)
        }
    }

    const toshort = {position:'pos',value:'val',boolean:'bool'}

    const appliedUni = ['list','prop','set','position','bool','boolean','id','value'].reduce((acc,t)=>{
        return Object.assign(acc,reduce(universal,(mem,fact,name)=> ({...mem, [(toshort[t]||t)+'_'+name]: fact(t)}),acc ));
    },{})

    const methods = Object.assign(appliedUni,{

        // ******************** DATATYPE List **********************

        list: (O,def)=> {
            if (T['list_'+def[0]]) {
                return T['list_'+def[0]](O,tail(def));
            } else if (isArray(def)) {
                return T.list_list(O,[def]);
            } else {
                throw "Unknown list def: "+def;
            }
        },

        list_list: (O,[vals])=> {
            var ret = vals.map(v=>T.value(O,v))
            return '['+ret.join(',')+']'
        },

        // ******************** DATATYPE prop **********************

        prop: (O,def,propname)=> {
            if (T['prop_'+def[0]]){
                return T['prop_'+def[0]](O,tail(def),propname);
            } else {
                throw "Unknown prop def: "+def;
            }
        },

        prop_is: (O,[value],propname)=> 'filterobj.'+propname+'==='+T.value(O,value),
        prop_isnt: (O,[value],propname)=> 'filterobj.'+propname+'!=='+T.value(O,value),

        // ******************** DATATYPE set **********************

        set: (O,def)=> {
            if (!isArray(def)){
                return T.layerref(O,def);
            } else if (T['set_'+def[0]]) {
                return T['set_'+def[0]](O,tail(def));
            } else {
                throw "Unknown set def: "+JSON.stringify(def);
            }
        },

        set_layer: (O,def)=> {
            return T.layerref(O,def[0]);
        },
        set_single: (O,[pos])=> `
            (function(){
                var ret = {};
                ret[${T.position(O,pos)}]=1;
                return ret;
            }())`,
        set_union: (O,sets)=> {
            let ret = '',
                setdefs = sets.map((def,n)=>'s'+n+' = '+T.set(O,def)).join(', '),
                copies = sets.map((def,n)=>'for(k in s'+n+'){ret[k]=1;}').join(' ');
            return `
                (function(){
                    var k, ret={}, ${setdefs};
                    ${copies}
                    return ret;
                }())`
        },
        set_intersect: (O,sets)=> {
            let ret = '',
                setdefs = sets.map((def,n)=>'s'+n+' = '+T.set(O,def)).join(', '),
                test = tail(sets).map((def,n)=>'s'+(n+1)+'[key]').join(' && ');
            return `
                (function(){
                    var ret={}, ${setdefs};
                    for(var key in s0){
                        if (${test}){
                            ret[key]=s0[key];
                        }
                    }
                    return ret;
                }())`
        },
        set_subtract: (O,sets)=> {
            let ret = '',
                setdefs = sets.map((def,n)=>'s'+n+' = '+T.set(O,def)).join(', '),
                test = tail(sets).map((def,n)=>'!s'+(n+1)+'[key]').join(' && ');
            return `
                (function(){
                    var ret={}, ${setdefs};
                    for(var key in s0){
                        if (${test}){
                            ret[key]=s0[key];
                        }
                    }
                    return ret;
                }())`
        },

        set_unitlayer: (O,[layername])=> {
            return 'UNITLAYERS['+T.value(O,layername)+']'
        },

        // layername is a plain string
        // This method sometimes used directly from elsewhere
        layerref: (O,layername)=> {
            if (isArray(layername)){
                layername = T.value(O,layername)
            }
            var bag = {board:1,light:1,dark:1}[layername] ? "BOARD"
                : T.blankUnitLayers(O,true)[layername] ? "UNITLAYERS"
                : T.isTerrainLayerRef(O,layername) ? "TERRAIN"
                : "ARTIFACTS"
            return layername[0].match(/[a-z]/) ? bag+"."+layername : bag+"["+layername+"]"
            //return bag+"."+layername; //"("+bag+"."+layername+"||{})";
        },

        // ******************** DATATYPE position **********************

        position: (O,def)=> {
            if (!isArray(def)){
                return T.pos_mark(O,[def]);
            } else if (T['pos_'+def[0]]) {
                return T['pos_'+def[0]](O,tail(def));
            } else {
                throw "Unknown position def: "+def;
            }
        },

        pos_mark: (O,[markname])=> "MARKS[" + T.value(O,markname) + "]",
        pos_turnpos: (O,[pos])=> `TURNVARS['${pos}']`,
        pos_pos: (O,[pos])=> T.value(O,pos),
        pos_target: (O)=> O && O.useforpos || "POS",
        pos_start: (O)=> "STARTPOS",
        pos_onlyin: (O,[set])=> "Object.keys("+T.set(O,set)+")[0]",

        // ******************** DATATYPE boolean **********************

        boolean: (O,def)=> {
            if (T['bool_'+def[0]]) {
                return T['bool_'+def[0]](O,tail(def));
            } else {
                throw "Unknown bool def: "+JSON.stringify(def);
            }
        },

        bool_truthy: (O,[value])=> "!!" + T.value(O,value),
        bool_falsy: (O,[value])=> "!" + T.value(O,value),
        bool_same: (O,[v1,v2])=> "(" + T.value(O,v1) + "===" + T.value(O,v2) + ")",
        bool_different: (O,[v1,v2])=> "(" + T.value(O,v1) + "!==" + T.value(O,v2) + ")",
        bool_morethan: (O,[v1,v2])=> "(" + T.value(O,v1) + ">" + T.value(O,v2) + ")",
        bool_anyat: (O,[set,pos])=> "!!("+T.set(O,set)+"["+T.position(O,pos)+"])",
        bool_noneat: (O,[set,pos])=> "!("+T.set(O,set)+"["+T.position(O,pos)+"])",
        bool_overlaps: (O,[s1,s2])=> T.boolean(O,['notempty',['intersect',s1,s2]]),  //"(!isEmpty("+T.set(O,["intersect",s1,s2])+"))",
        bool_isempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length===0",
        bool_notempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length!==0",
        bool_and: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" && ") + ")",
        bool_or: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" || ") + ")",
        bool_not: (O,[bool])=> "!"+T.boolean(O,bool),
        bool_true: (O)=> "true",
        bool_false: (O)=> "false",
        bool_valinlist: (O,[val,list])=> '('+T.list(O,list)+'.indexOf('+T.value(O,val)+')!==-1)',
        bool_justinone: (O,[pos,set1,set2])=> `((TEMP=${T.position(O,pos)}) && !${T.set(O,set1)}[TEMP] !== !${T.set(O,set2)}[TEMP])`,

        // ******************** DATATYPE id **********************

        id: (O,def)=> {
            if (!isArray(def)){
                return T.val_value(O,[def]);
            } else if (T['id_'+def[0]]) {
                return T['id_'+def[0]](O,tail(def));
            } else if (T['val_'+def[0]]) {
                return T['val_'+def[0]](O,tail(def));
            } else {
                throw "Unknown id def: "+def;
            }
        },

        id_idat: (O,[pos])=> "(UNITLAYERS.units["+T.position(O,pos)+"] || [{}]).id",
        id_loopid: (O)=> "LOOPID",
        id_id: (O,id)=> T.value(O.id),

        // ******************** DATATYPE value **********************

        value: (O,def)=> {
            if (!isArray(def)){
                return T.val_value(O,[def]);
            } else if (T['val_'+def[0]]) {
                return T['val_'+def[0]](O,tail(def));
            } else if (T['id_'+def[0]]) {
                return T['id_'+def[0]](O,tail(def));
            } else if (T['pos_'+def[0]]) {
                return T['pos_'+def[0]](O,tail(def));
            } else {
                throw "Unknown value def: "+def;
            }
        },
        val_indexlist: (O,[index,list])=> T.list(O,list)+'['+T.value(O,index)+']',
        val_pos: (O,[pos])=> T.position(O,pos),
        val_reldir: (O,[dir,rel])=> `relativedirs[${T.value(O,rel)}-2+${T.value(O,dir)}]`,
        val_value: (O,[value])=> typeof value === "string" ? "'"+value+"'" : value,
        val_val: (O,[value])=> typeof value === "string" ? "'"+value+"'" : value,
        val_player: (O)=> O.player,
        val_currentplayer: (O)=> O.player,
        val_otherplayer: (O)=> O.player === 1 ? 2 : 1,
        val_sum: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" + ") + ")",
        val_concat: (O,vals)=> "((" + vals.map(v=>T.value(O,v)).join("+'') + (") + "))",
        val_prod: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" * ") + ")",
        val_minus: (O,[val1,val2])=> T.value(O,val1)+' - '+T.value(O,val2),
        val_ctxval: (O,[name])=> "CONTEXT[" + T.value(O,name) + "]",
        val_dir: (O)=> O && O.usefordir || "DIR",
        val_max: (O)=> "MAX",
        val_stopreason: (O)=> "STOPREASON",
        val_countsofar: (O)=> "CURRENTCOUNT",
        val_totalcount: (O)=> "TOTALCOUNT",
        val_walklength: (O)=> "WALKLENGTH",
        val_neighbourcount: (O)=> "NEIGHBOURCOUNT",
        val_step: (O)=> "STEP",
        val_read: (O,[layer,pos,prop])=> {
            var pos = layer === 'board' ? T.set(O,layer)+"["+T.position(O,pos)+"]" : "("+T.set(O,layer)+"["+T.position(O,pos)+"]||{})";
            return pos+"["+T.value(O,prop)+"]";
        },
        val_sizeof: (O,[set])=> `Object.keys(${T.set(O,set)}).length`,
        val_harvest: (O,[set,prop])=> `reduce(${T.set(O,set)},function(mem,obj){
            return mem+obj[${T.value(O,prop)}];
        },0)`,
        val_score: (O,[set,score])=> `Object.keys(${T.set(O,set)}).reduce(function(mem,pos){
            return mem+(${score}[pos]||0);
        },0)`,
        val_turn: (O)=> "turn.turn"
    })

    return Object.assign(T,methods)
}