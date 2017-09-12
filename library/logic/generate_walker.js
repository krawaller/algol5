

export default C => Object.assign(C,{

	// wants full walkerdef
	drawwalkblock: (O,def)=> {
		let ret = ''
		if (def.blocks && def.draw.block){
			let conds = ['BLOCKS[POS]'];
			if (def.steps && ! def.testblocksbeforesteps){
				conds.push('allowedsteps[POS]');
			}
			ret += `if (${conds.join(' && ')}){` 
			ret += C.performdraw(O,def.draw.block);
			if (def.draw.all){
				ret += C.performdraw(O,def.draw.all);
			}
			ret += '} '
		}
		return ret
	},
	// wants full walkerdef
	drawwalksteps: (O,def)=> {
		let ret = ''
		if (def.draw.steps || def.draw.all || def.draw.counted){
			var usesstep = C.contains([def.draw.steps,def.draw.all,def.draw.counted],['step'])
			if (usesstep) ret += 'var STEP = 0; '
			ret += 'for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){'
			ret += 'POS=walkedsquares[walkstepper]; '
			ret += C.drawwalksinglestep(O,def)
			ret += '}'
		}
		return ret
	},
	drawwalksinglestep: (O,def)=> {
		var usesstep = C.contains([def.draw.steps,def.draw.all,def.draw.counted],['step'])
		let ret = '';
		if (usesstep) ret += 'STEP++; '
		if (def.count && C.contains(def.draw,['countsofar'])){
			ret += 'CURRENTCOUNT = countedwalkpositions[walkstepper]; '
		}
		if (def.draw.steps){
			ret += C.performdraw(O,def.draw.steps)
		}
		if (def.draw.all){
			ret += C.performdraw(O,def.draw.all)
		}
		if (def.draw.counted){
			ret += 'if (walkpositionstocount[POS]) {'
			ret += C.performdraw(O,def.draw.counted)
			ret += '} '
		}
		return ret
	},
	// wants full walkerdef. 
	drawwalkstart: (O,def)=> {   // TODO - handle all + startasstep?
		let ret = ''
		if (def.draw.start){
			var needspos = C.contains([def.draw.start,def.draw.all],['target']);
			if (needspos){
				ret += 'POS=STARTPOS; '
			} else {
				O = {...O, useforpos: 'STARTPOS'}
			}
			ret += C.performdraw(O,def.draw.start);
			if (def.draw.all){
				ret += C.performdraw(O,def.draw.all);
			}
		}
		return ret
	},
	// wants full walkerdef. 
	drawwalklast: (O,def)=> {
		let ret = ''
		if (def.draw.last){
			ret += 'if (WALKLENGTH){ '
			if (C.contains(def.draw.last,['step'])) ret += 'STEP=WALKLENGTH; '
			if (C.contains(def.draw.last,['target'])) {
				ret += 'POS=walkedsquares[WALKLENGTH-1]; '
				ret += C.performdraw(O,def.draw.last)
			} else {
				ret += C.performdraw({...(O||{}),useforpos:'walkedsquares[WALKLENGTH-1]'},def.draw.last)
				//ret += C.performdraw(O,def.draw.last,'walkedsquares[WALKLENGTH-1]')
			}
			ret += '} '
		}
		return ret
	}
})
