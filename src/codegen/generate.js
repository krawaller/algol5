import map from 'lodash/collection/map'
import isNumber from 'lodash/lang/isNumber'

import U from "../utils"

export default C => Object.assign(C,{

	// ------------ GENERAL STUFF -----------

	// assumes connections, DIR, LENGTH, nextpos
	// and if used BLOCKS, allowedsteps, MAX
	stopreason: (O,def,foo,useforblocks)=> {
		def = def || {}
		O = O || {}
		let ret = ''
		if (def.max){
			ret += 'LENGTH === MAX ? "reachedmax" : '
		}
		ret += '!(nextpos=connections[POS]['+(O.usefordir || 'DIR')+']) ? "outofbounds" : '
		if (def.type==='floater'){
			ret += 'REACHED[nextpos] ? "alreadyreached" : '
		}
		if (def.blocks && def.steps && def.testblocksbeforesteps){
			ret += (useforblocks||'BLOCKS')+'[nextpos] ? "hitblock" : '
		}
		if (def.steps){
			ret += '!allowedsteps[nextpos] ? "nomoresteps" : '
		}
		if (def.blocks && !def.testblocksbeforesteps){
			ret += (useforblocks||'BLOCKS')+'[nextpos] ? "hitblock" : '
		}
		return '('+ret+' null)';
	},

	// we only ever add to artifact layers.
	addtolayer: (O,layer,pos,obj)=> 'ARTIFACTS['+layer+']['+pos+']='+obj+'; ',

	addtolayerbyref: (O,layerref,pos,obj)=> layerref+'['+pos+']='+obj+'; ',

	// assumes vartouse is defined (defaults to POS)
	// also assumed targetlayername if flag is true
	performdraw: (O,def,foo,targetlayerpredefined)=> {
		let vartouse = O && O.useforpos || 'POS'
		let ret = ''
		let cond = []
		if (def.condition){
			cond.push(C.boolean(O,def.condition))
		}
		if (def.unlessover){
			cond.push( '!'+C.set(O,def.unlessover)+'['+vartouse+']' )
		}
		if (def.ifover){
			cond.push( C.set(O,def.ifover)+'['+vartouse+']' )
		}
		if (cond.length){
			ret += 'if ('+cond.join(' && ')+'){ '
		}
		if (def.include && def.include.owner){ // if artifact has owner it must be added to more than one layer
			if (!targetlayerpredefined){
				ret += 'var targetlayername='+C.value(O,def.tolayer)+'; '
			}
			var prefix, owner = C.value(O,def.include.owner);
			if (owner === 0){
				prefix = '"neutral"';
			} else if (owner === O.player) {
				prefix = '"my"'
			} else if (isNumber(owner)) {
				prefix = '"opp"'
			} else {
				prefix = 'ownernames[artifact.owner]'
			}
			ret += 'var artifact='+C.artifactliteral(O,def)+'; '
			ret += C.addtolayer(O,'targetlayername',vartouse,'artifact')
			ret += C.addtolayer(O,prefix+' + targetlayername',vartouse,'artifact')
		} else {
			ret += C.addtolayer(
				O,
				targetlayerpredefined ? 'targetlayername' : C.value(O,def.tolayer),
				vartouse,
				C.artifactliteral(O,def)
			)
		}
		if (cond.length){
			ret += '} '
		}
		return ret;
	},
	// def has condition, tolayer and includes
	artifactliteral: (O,def)=> {
		let ret = '{';
		if (def.include){
			ret += map(def.include,(valdef,key)=>(key+': '+C.value(O,valdef))).join(', ');
		}
		ret += '} '
		return ret;
	},

	// called from instruction
	applyGenerator: (O,def)=> {
		switch(def.type){
			case 'walker': return C.applywalker(O,def)
			case 'neighbour': return C.applyneighbours(O,def)
			case 'filter': return C.applyfilter(O,def)
			default: throw 'Unknown generator def: '+def
		}
	}
})
