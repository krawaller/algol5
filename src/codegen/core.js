import _ from "lodash";

const universal = {
    ifelse: (datatype)=> (O,[bool,alt1,alt2])=> "(" + T.boolean(O,bool) + "?" + T[datatype](O,alt1) + ":" + T[datatype](O,alt2) + ")",
    playercase: (datatype)=> (O,[alt1,alt2])=> T[datatype](O,O.player === 1 ? alt1 : alt2)
}

const withUniversals = (datatype,methods)=> _.reduce(universal,(mem,umaker,uname)=>{
    mem[uname] = umaker(datatype);
    return mem;
},methods)

const listTypes = withUniversals("list",{
    list: (O,[vals])=> {
        var ret = vals.map(v=>T.value(O,v))
        return '['+ret.join(',')+']'
    }
})

const idTypes = withUniversals("id",{
    idat: (O,[pos])=> "(UNITLAYERS.all["+T.position(O,pos)+"] || [{}]).id",
    loopid: (O)=> "CONTEXT.loopid",
    id: (O,id)=> T.value(O.id)
})

const valueTypes = withUniversals("value",{
    pos: (O,[pos])=> T.position(O,pos),
    value: (O,[value])=> typeof value === "string" ? "'"+value+"'" : value,
    currentplayer: (O)=> O.player,
    otherplayer: (O)=> O.player === 1 ? 2 : 1,
    sum: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" + ") + ")",
    prod: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" * ") + ")",
    ctxval: (O,[name])=> "CONTEXT[" + T.value(O,name) + "]",
    dir: (O)=> "DIR",
    max: (O)=> "MAX",
    stopreason: (O)=> "STOPREASON",
    countsofar: (O)=> "CURRENTCOUNT",
    totalcount: (O)=> "TOTALCOUNT",
    walklength: (O)=> "WALKLENGTH",
    neighbourcount: (O)=> "NEIGHBOURCOUNT",
    step: (O)=> "STEP",
    read: (O,[layer,pos,prop])=> {
        var ret = "("+T.set(O,layer)+"["+T.position(O,pos)+"] && "+T.set(O,layer)+"["+T.position(O,pos)+"]["+T.value(O,prop)+"])"
        //console.log("READ",ret)
        return ret;
    }
})

const boolTypes = withUniversals("boolean",{
    truthy: (O,[value])=> "!!" + T.value(O,value),
    falsy: (O,[value])=> "!" + T.value(O,value),
    same: (O,[v1,v2])=> "(" + T.value(O,v1) + "===" + T.value(O,v2) + ")",
    different: (O,[v1,v2])=> "(" + T.value(O,v1) + "!==" + T.value(O,v2) + ")",
    morethan: (O,[v1,v2])=> "(" + T.value(O,v1) + ">" + T.value(O,v2) + ")",
    anyat: (O,[set,pos])=> T.set(O,set)+".hasOwnProperty("+T.position(O,pos)+")",
    noneat: (O,[set,pos])=> "!("+T.set(O,set)+".hasOwnProperty("+T.position(O,pos)+"))",
    overlaps: (O,[s1,s2])=> T.boolean(O,['notempty',['intersect',s1,s2]]),  //"(!_.isEmpty("+T.set(O,["intersect",s1,s2])+"))",
    isempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length===0",
    notempty: (O,[s1])=> "Object.keys("+T.set(O,s1)+" || {}).length!==0",
    and: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" && ") + ")",
    or: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" || ") + ")"
})

const positionTypes = withUniversals("position",{
    mark: (O,[markname])=> "MARKS[" + T.value(O,markname) + "]",
    ctxpos: (O,[name])=> "CONTEXT[" + T.value(O,name) + "]",
    pos: (O,[pos])=> T.value(O,pos),
    target: (O)=> "POS"
})

const setTypes = withUniversals("set",{
    layer: (O,def)=> {
        //console.log("LAYER:",def)
        return T.layerref(O,def[0]); // "(ARTIFACTS["+T.value(O,layername)+"] || {})", // TODO - vary!
    },
    single: (O,[pos])=> `
        (function(){
            var ret = {};
            ret[${T.position(O,pos)}]=1;
            return ret;
        }())`,
    union: (O,sets)=> {
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
    intersect: (O,sets)=> {
        let ret = '',
            setdefs = sets.map((def,n)=>'s'+n+' = '+T.set(O,def)).join(', '),
            test = _.tail(sets).map((def,n)=>'s'+(n+1)+'[key]').join(' && ');
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
    subtract: (O,sets)=> {
        let ret = '',
            setdefs = sets.map((def,n)=>'s'+n+' = '+T.set(O,def)).join(', '),
            test = _.tail(sets).map((def,n)=>'!s'+(n+1)+'.hasOwnProperty(key)').join(' && ');
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
    }//"_.omit("+T.set(O,s1)+",Object.keys("+T.set(O,s2)+"))"
})

const propTypes = {
    is: (O,[value],propname)=> 'OBJ.'+propname+'==='+T.value(O,value),
    isnt: (O,[value],propname)=> 'OBJ.'+propname+'!=='+T.value(O,value)
}

const T = {
    prop: (O,def,propname)=> {
        if (propTypes[def[0]]){
            return propTypes[def[0]](O,_.tail(def),propname);
        } else {
            throw "Unknown prop def: "+def;
        }
    },
    list: (O,def)=> {
        if (listTypes[def[0]]) {
            return listTypes[def[0]](O,_.tail(def));
        } else if (_.isArray(def)) {
            return listTypes.list(O,[def]);
        } else {
            throw "Unknown list def: "+def;
        }
    },
    set: (O,def)=> {
        if (!_.isArray(def)){
            return T.layerref(O,def);
        } else if (setTypes[def[0]]) {
            return setTypes[def[0]](O,_.tail(def));
        } else {
            throw "Unknown set def: "+def;
        }
    },
    position: (O,def)=> {
        if (!_.isArray(def)){
            return positionTypes.mark(O,[def]);
        } else if (positionTypes[def[0]]) {
            return positionTypes[def[0]](O,_.tail(def));
        } else {
            throw "Unknown position def: "+def;
        }
    },
    boolean: (O,def)=> {
        if (boolTypes[def[0]]) {
            return boolTypes[def[0]](O,_.tail(def));
        } else {
            throw "Unknown bool def: "+def;
        }
    },
    id: (O,def)=> {
        if (!_.isArray(def)){
            return valueTypes.value(O,[def]);
        } else if (idTypes[def[0]]) {
            return idTypes[def[0]](O,_.tail(def));
        } else if (valueTypes[def[0]]) {
            return valueTypes[def[0]](O,_.tail(def));
        } else {
            throw "Unknown id def: "+def;
        }
    },
    value: (O,def)=> {
        if (!_.isArray(def)){
            return valueTypes.value(O,[def]);
        } else if (valueTypes[def[0]]) {
            return valueTypes[def[0]](O,_.tail(def));
        } else {
            throw "Unknown value def: "+def;
        }
    },
    // layername is a plain string
    layerref: (O,layername)=> {
        var bag = O && O.layermappings && O.layermappings[layername] || "ARTIFACTS"
        return "("+bag+"."+layername+"||{})";
    }
}

module.exports = T