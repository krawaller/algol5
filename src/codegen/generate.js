import _ from 'lodash'
import C from "./core"

const G = {
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
		let ret = 'CONTEXT.dir=DIR; CONTEXT.start=STARTPOS; '
		if (def.max){
			ret += 'var MAX='+C.value(O,def.max)+'; '
			ret += 'CONTEXT.max=MAX; '
		}
		return ret;
	}
}

export default G

/*
Algol.generateWalkerPodsInDir = function(startstate,def,recorder,startpos,dir){

startstate = startstate.setIn(["context","dir"],dir).setIn(["context","start"],startpos);
var pos=startpos, walk = [], reason, blockpos,
	blocks = def.has("blocks") && this.evaluatePositionSet(startstate,def.get("blocks")),
	steps = def.has("steps") && this.evaluatePositionSet(startstate,def.get("steps")),
	tobecounted = def.has("count") && this.evaluatePositionSet(startstate,def.get("count")),
	prevcounttotal = 0, counttrack = [],
	max = def.has("max") ? this.evaluateValue(startstate,def.get("max")) : undefined;
startstate = startstate.setIn(["context","max"],max).setIn(["context","target"],startpos);
if (def.get("startasstep")){
	walk.push(startpos);
	if (tobecounted){
		counttrack.push(prevcounttotal = (prevcounttotal + (tobecounted.contains(startpos)?1:0)));
	}
}
*/