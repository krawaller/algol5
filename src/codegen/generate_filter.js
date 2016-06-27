import map from 'lodash/collection/map'

import U from "../utils"

export default C => Object.assign(C,{

	// ------------ FILTER STUFF -----------

	applyfilter: (O,def)=> {
		let ret = ''
		ret += 'var filtersourcelayer = '+C.layerref(O,def.layer)+'; '
		if (!U.contains(def.tolayer,'target')){
			ret += 'var filtertargetlayer = '+C.layerref(O,def.tolayer)+'; '
		}
		ret += 'for (var POS in filtersourcelayer){'
		ret += C.filterposition(O,def)
		ret += '}'
		return ret
	},

	// assumes filtersourcelayer, POS,
	filterposition: (O,def)=> {
		let ret = ''
		if (U.contains(def.tolayer,'target')){
			ret += 'var filtertargetlayer = '+C.layerref(O,def.tolayer)+'; '
		}
		ret += 'if (filtersourcelayer[POS]){'
		ret += 'var filterobj = filtersourcelayer[POS]; '
		ret += C.filterobject(O,def)
		ret += '} '
		return ret
	},

	// assumes POS, filterobj, filtertargetlayername
	filterobject: (O,def)=> { // TODO - core datatype for matcher?
		let ret = ''
		let conds = (def.condition ? [C.boolean(O,def.condition)] : [])
		conds = conds.concat(map(def.matching,(test,key)=> C.prop(O,test,key) ))
		ret += 'if (' + conds.join(' && ') + '){'
		ret += C.addtolayerbyref(O,'filtertargetlayer','POS','filterobj');
		//ret += C.addtolayer(O,'filtertargetlayername','POS','filterobj')
		ret += '} '
		return ret
	}
})
