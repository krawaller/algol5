import _ from 'lodash'
import C from "./core"

const G = {
	applywalker: (O,def)=> {
		let ret = ''
		ret += 'var STARTS = '+C.set(O,def.starts)+'; '
		ret += 'for(var STARTPOS in STARTS){'
		ret += G.walkfromstart(O,def)
		ret += '} '
		return ret
	},
	// wants full walkerdef. 
	// assumes STARTPOS, CONNECTIONS
	walkfromstart: (O,def)=> {
		let ret = ''
		ret += 'var DIR; '
		ret += 'var alldirs = '+C.list(O,def.dirs)+'; '
		ret += 'var nbrofdirs = alldirs.length; '
		ret += 'for(var dirnbr=0; dirnbr<nbrofdirs; dirnbr++){'
		ret += 'DIR = alldirs[dirnbr]; '
		ret += G.walkindir(O,def);
		ret += '} '
		return ret
	},
	// wants full walkerdef. 
	// assumes STARTPOS, DIR, CONNECTIONS
	walkindir: (O,def)=> {
		let ret = ''
		ret += G.prepwalkstart(O,def)
		ret += 'while(!(STOPREASON='+G.stopreason(O,def)+')){'
		ret += G.takewalkstep(O,def)
		ret += '}'
		ret += G.afterwalk(O,def)
		ret += G.drawwalkblock(O,def)
		ret += G.drawwalkstart(O,def)
		ret += G.drawwalksteps(O,def)
		return ret;
	},
	// wants full walkerdef.
	afterwalk: (O,def)=> {
		let ret = ''
		ret += 'var WALKLENGTH = WALK.length; '
		if (def && def.count){
			ret += 'var TOTALCOUNT = CURRENTCOUNT; '
		}
		return ret;
	},
	// wants full walkerdef
	drawwalksteps: (O,def)=> {
		let ret = ''
		if (def.draw.steps || def.draw.all || def.draw.counted){
			ret += 'var STEP = 0; '
			ret += 'for(var stepper=0;stepper<WALKLENGTH;stepper++){'
			ret += 'POS=WALK[stepper]; '
			ret += 'STEP++; '
			if (def.count){
				ret += 'CURRENTCOUNT = COUNTTRACK[stepper]; '
			}
			if (def.draw.steps){
				ret += G.performdraw(O,def.draw.steps)
			}
			if (def.draw.all){
				ret += G.performdraw(O,def.draw.all)
			}
			if (def.draw.counted){
				ret += 'if (COUNT[POS]) {'
				ret += G.performdraw(O,def.draw.counted)
				ret += '} '
			}
			ret += '}'
		}
		return ret
	},
	// wants full walkerdef. 
	drawwalkstart: (O,def)=> {
		let ret = ''
		if (def.draw.start){
			ret += 'POS=STARTPOS; '
			ret += G.performdraw(O,def.draw.start)
			if (def.draw.all){
				ret += G.performdraw(O,def.draw.all) // TODO - handle all + startasstep?
			}
		}
		return ret
	},
	drawwalklast: (O,def)=> {
		let ret = ''
		if (def.draw.last){
			ret += 'POS=WALK[WALKLENGTH-1]; '
			ret += G.performdraw(O,def.draw.last)
		}
		return ret
	},
	// wants full walkerdef
	drawwalkblock: (O,def)=> {
		let ret = ''
		if (def.blocks && def.draw.block){
			ret += 'if (STOPREASON="hitblock"){'
			ret += 'POS=NEXTPOS; '
			ret += G.performdraw(O,def.draw.block);
			if (def.draw.all){
				ret += G.performdraw(O,def.draw.all);
			}
			ret += '} '
		}
		return ret
	},
	// assumes CONNECTIONS, DIR, LENGTH
	// and if used BLOCKS, STEPS, MAX
	stopreason: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.max){
			ret += 'LENGTH === MAX ? "reachedmax" : '
		}
		ret += '!(NEXTPOS=CONNECTIONS[POS][DIR]) ? "outofbounds" : '
		if (def.blocks && def.steps && def.testblocksbeforesteps){
			ret += 'BLOCKS[NEXTPOS] ? "hitblock" : '
		}
		if (def.steps){
			ret += '!STEPS[NEXTPOS] ? "nomoresteps" : '
		}
		if (def.blocks && !def.testblocksbeforesteps){
			ret += 'BLOCKS[NEXTPOS] ? "hitblock" : '
		}
		return '('+ret+' null)';
	},
	// ASSUMES STARTPOS, DIR
	prepwalkstart: (O,def)=> {
		def = def || {}
		let ret =  ''
		ret += 'var WALK = []; '
		ret += 'var STOPREASON = ""; '
		ret += 'var NEXTPOS = ""; '
		if (def.max){
			ret += 'var MAX='+C.value(O,def.max)+'; '
		}
		if (def.startasstep){
			ret += 'var POS = "faux"; '
			ret += 'CONNECTIONS.faux[DIR]=STARTPOS; '
		} else {
			ret += 'var POS = STARTPOS; '
		}
		if (def.steps){
			ret += 'var STEPS = '+C.set(O,def.steps)+'; '
		}
		if (def.blocks){
			ret += 'var BLOCKS = '+C.set(O,def.blocks)+'; '
		}
		if (def.count){
			ret += 'var COUNT = '+C.set(O,def.count)+'; '
			ret += 'var COUNTTRACK = []; '
			ret += 'var CURRENTCOUNT = 0; '
		}
		return ret;
	},
	// ASSUMES NEXTPOS, ..
	takewalkstep: (O,def)=> {
		def = def || {}
		let ret = 'POS = NEXTPOS; '
		ret += 'WALK.push(NEXTPOS); '
		if (def.count){
			ret += 'COUNTTRACK.push(CURRENTCOUNT+=(COUNT[POS]?1:0)); '
		}
		return ret;
	},

	// ------------ GENERAL STUFF -----------

	// assumes POS
	performdraw: (O,def)=> {
		let ret = ''
		if (def.condition){
			ret += 'if ('+C.boolean(O,def.condition)+'){ '
		}
		ret += 'var artifact='+G.artifactliteral(O,def)+'; '
		ret += 'var targetlayer='+C.value(O,def.tolayer)+'; '
		ret += 'LAYERS[targetlayer][POS]=(LAYERS[targetlayer][POS]||[]).concat([artifact]); '
		if (def.include && def.include.owner){
			ret += 'var otherlayer=["neutral",'+(O.player===1?'"my","opp"':'"opp","my"')+'][artifact.owner]+targetlayer; '
			ret += 'LAYERS[otherlayer][POS]=(LAYERS[otherlayer][POS]||[]).concat([artifact]); '
		}
		if (def.condition){
			ret += '} '
		}
		return ret;
	},
	// def has condition, tolayer and includes
	artifactliteral: (O,def)=> {
		let ret = '{';
		if (def.include){
			ret += _.map(def.include,(valdef,key)=>(key+': '+C.value(O,valdef))).join(', ');
		}
		ret += '} '
		return ret;
	}
}

export default G
