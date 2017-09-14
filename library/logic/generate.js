import * as map from 'lodash/map'
import * as isNumber from 'lodash/isNumber'

export default C => Object.assign(C,{

	// ------------ GENERAL STUFF -----------

	// assumes connections, DIR, LENGTH
	// and if used BLOCKS, allowedsteps, MAX
	stopreason: (O,def,foo,useforblocks)=> {
		def = def || {}
		O = O || {}
		let ret = ''
		if (def.max){
			ret += 'LENGTH === MAX ? "reachedmax" : '
		}
		ret += '!(POS=connections[POS]['+(O.usefordir || 'DIR')+']) ? "outofbounds" : '
		if (def.type==='floater'){
			ret += 'REACHED[POS] ? "alreadyreached" : '
		}
		if (def.blocks && def.steps && def.testblocksbeforesteps){
			ret += (useforblocks||'BLOCKS')+'[POS] ? "hitblock" : '
		}
		if (def.steps){
			ret += '!allowedsteps[POS] ? "nomoresteps" : '
		}
		if (def.blocks && !def.testblocksbeforesteps){
			ret += (useforblocks||'BLOCKS')+'[POS] ? "hitblock" : '
		}
		return '('+ret+' null)';
	},

	// assumes connections, DIR, LENGTH
	// and if used BLOCKS, allowedsteps, MAX
	stopcond: (O,def,foo,useforblocks)=> {
		def = def || {}
		O = O || {}
		let conds = []
		if (def.max){
			conds.push('LENGTH < MAX')
		}
		conds.push('(POS=connections[POS]['+(O.usefordir || 'DIR')+'])')
		if (def.type==='floater'){
			conds.push('!REACHED[POS]')
		}
		if (def.blocks && def.steps && def.testblocksbeforesteps){
			conds.push( '!'+ (useforblocks||'BLOCKS')+'[POS]' )
		}
		if (def.steps){
			conds.push( 'allowedsteps[POS]' )
		}
		if (def.blocks && !def.testblocksbeforesteps){
			conds.push( '!'+ (useforblocks||'BLOCKS')+'[POS]' )
		}
		return conds.join(' && ');
	},


})
