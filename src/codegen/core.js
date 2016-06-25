import tail from "lodash/array/tail";
import isArray from "lodash/lang/isArray";

const universal = {
    ifelse: (datatype)=> (O,[bool,alt1,alt2])=> "(" + T.boolean(O,bool) + "?" + T[datatype](O,alt1) + ":" + T[datatype](O,alt2) + ")",
    playercase: (datatype)=> (O,[alt1,alt2])=> T[datatype](O,O.player === 1 ? alt1 : alt2)
}

const T = {
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

    list_ifelse: universal.ifelse('list'),
    list_playercase: universal.playercase('list'),

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

    prop_ifelse: universal.ifelse('prop'),
    prop_playercase: universal.playercase('prop'),

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
            test = tail(sets).map((def,n)=>'!s'+(n+1)+'.hasOwnProperty(key)').join(' && ');
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

    set_ifelse: universal.ifelse('set'),
    set_playercase: universal.playercase('set'),


    // layername is a plain string
    // This method sometimes used directly from elsewhere
    layerref: (O,layername)=> {
        var bag = O && O.layermappings && O.layermappings[layername] || "ARTIFACTS"
        // special case for units all
        if (layername==='units'){
            return "UNITLAYERS.all"
        }
        // special case for board layers
        if ({board:1,light:1,dark:1}[layername]){
            return "BOARD."+layername
        }
        return bag+"."+layername; //"("+bag+"."+layername+"||{})";
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
    pos_ctxpos: (O,[name])=> "CONTEXT[" + T.value(O,name) + "]",
    pos_pos: (O,[pos])=> T.value(O,pos),
    pos_target: (O)=> "POS",
    pos_start: (O)=> "STARTPOS",
    pos_onlyin: (O,[set])=> "Object.keys("+T.set(O,set)+")[0]",

    pos_ifelse: universal.ifelse('position'),
    pos_playercase: universal.playercase('position'),

    // ******************** DATATYPE boolean **********************

    boolean: (O,def)=> {
        if (T['bool_'+def[0]]) {
            return T['bool_'+def[0]](O,tail(def));
        } else {
            throw "Unknown bool def: "+def;
        }
    },

    bool_truthy: (O,[value])=> "!!" + T.value(O,value),
    bool_falsy: (O,[value])=> "!" + T.value(O,value),
    bool_same: (O,[v1,v2])=> "(" + T.value(O,v1) + "===" + T.value(O,v2) + ")",
    bool_different: (O,[v1,v2])=> "(" + T.value(O,v1) + "!==" + T.value(O,v2) + ")",
    bool_morethan: (O,[v1,v2])=> "(" + T.value(O,v1) + ">" + T.value(O,v2) + ")",
    bool_anyat: (O,[set,pos])=> T.set(O,set)+".hasOwnProperty("+T.position(O,pos)+")",
    bool_noneat: (O,[set,pos])=> "!("+T.set(O,set)+".hasOwnProperty("+T.position(O,pos)+"))",
    bool_overlaps: (O,[s1,s2])=> T.boolean(O,['notempty',['intersect',s1,s2]]),  //"(!isEmpty("+T.set(O,["intersect",s1,s2])+"))",
    bool_isempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length===0",
    bool_notempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length!==0",
    bool_and: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" && ") + ")",
    bool_or: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" || ") + ")",
    bool_true: (O)=> "true",
    bool_false: (O)=> "false",

    bool_ifelse: universal.ifelse('boolean'),
    bool_playercase: universal.playercase('boolean'),

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

    id_idat: (O,[pos])=> "(UNITLAYERS.all["+T.position(O,pos)+"] || [{}]).id",
    id_loopid: (O)=> "LOOPID",
    id_id: (O,id)=> T.value(O.id),

    id_ifelse: universal.ifelse('id'),
    id_playercase: universal.playercase('id'),

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

    val_pos: (O,[pos])=> T.position(O,pos),
    val_value: (O,[value])=> typeof value === "string" ? "'"+value+"'" : value,
    val_currentplayer: (O)=> O.player,
    val_otherplayer: (O)=> O.player === 1 ? 2 : 1,
    val_sum: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" + ") + ")",
    val_prod: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" * ") + ")",
    val_ctxval: (O,[name])=> "CONTEXT[" + T.value(O,name) + "]",
    val_dir: (O)=> "DIR",
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

    val_ifelse: universal.ifelse('value'),
    val_playercase: universal.playercase('value')
}

module.exports = T