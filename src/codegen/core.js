import _ from "lodash";

const universal = {
	ifelse: (datatype)=> (O,[bool,alt1,alt2])=> "(" + T.boolean(O,bool) + "?" + T[datatype](O,alt1) + ":" + T[datatype](O,alt2) + ")",
	playercase: (datatype)=> (O,[alt1,alt2])=> T[datatype](O,O.player === 1 ? alt1 : alt2)
}

const withUniversals = (datatype,methods)=> _.reduce(universal,(mem,umaker,uname)=>{
	mem[uname] = umaker(datatype);
	return mem;
},methods)


const idTypes = withUniversals("id",{
	idofunitat: (O,[pos])=> "(LAYERS.units["+T.position(O,pos)+"] || [{}]).id",
	loopid: (O)=> "CONTEXT.loopid",
	id: (O,id)=> T.value(O.id)
})

const valueTypes = withUniversals("value",{
	value: (O,[value])=> typeof value === "string" ? "'"+value+"'" : value,
	currentplayer: (O)=> O.player,
	sum: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" + ") + ")",
	prod: (O,vals)=> "(" + vals.map(v=>T.value(O,v)).join(" * ") + ")",
	ctxval: (O,[name])=> "CONTEXT[" + T.value(O,name) + "]",
	read: (O,[layer,pos,prop])=> "(LAYERS["+T.value(O,layer)+"] && LAYERS["+T.value(O,layer)+"]["+T.position(O,pos)+"] && LAYERS["+T.value(O,layer)+"]["+T.position(O,pos)+"][0]["+ T.value(O,prop)+"])"
})

const boolTypes = withUniversals("boolean",{
	truthy: (O,[value])=> "!!" + T.value(O,value),
	falsy: (O,[value])=> "!" + T.value(O,value),
	same: (O,[v1,v2])=> "(" + T.value(O,v1) + "=" + T.value(O,v2) + ")",
	anyat: (O,[set,pos])=> T.set(O.set)+"["+T.position(O,pos)+"]",
	overlaps: (O,[s1,s2])=> "(!_.isEmpty("+T.set(O,["intersect",s1,s2])+"))",
	isempty: (O,[s1])=> "_.isEmpty("+T.set(O,s1)+")",
	notempty: (O,[s1])=> "(!_.isEmpty("+T.set(O,s1)+"))",
	and: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" && ") + ")",
	or: (O,bools)=> "(" + bools.map(b=>T.boolean(O,b)).join(" || ") + ")",
})

const positionTypes = withUniversals("position",{
	mark: (O,[markname])=> "MARKS[" + T.value(O,markname) + "]",
	ctxpos: (O,[name])=> "CONTEXT[" + T.value(O,name) + "]",
	pos: (O,[pos])=> T.value(O,pos)
})

const setTypes = withUniversals("set",{
	layer: (O,[layername])=> "(LAYERS["+T.value(O,layername)+"] || {})",
	single: (O,[pos])=> "_.object(["+T.position(O,pos)+"],[1])",
	union: (O,[s1,s2])=> "Object.assign({},"+T.set(O,s1)+","+T.set(O,s2)+")",
	intersect: (O,[s1,s2])=> "_.pick("+T.set(O,s1)+",Object.keys("+T.set(O,s2)+"))", 
	subtract: (O,[s1,s2])=> "_.omit("+T.set(O,s1)+",Object.keys("+T.set(O,s2)+"))"
})

const T = {
	set: (O,def)=> {
		if (!_.isArray(def)){
			return setTypes.layer(O,[def]);
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
		} else if (valueTypes[def[0]]) {
			return idTypes[def[0]](O,_.tail(def));
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
	}
}

export default T;