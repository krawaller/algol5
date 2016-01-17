import _ from 'lodash'
import C from "./core"

const G = {
	// def has condition, tolayer and includes
	artifactliteral: (O,def)=> {
		let ret = '{';
		if (def.include){
			ret += _.map(def.include,(valdef,key)=>(key+': '+C.value(O,valdef))).join(', ');
		}
		ret += '} '
		return ret;
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
		let ret = 'var WALK = []; '
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
	// uses WALK, COUNTTRACK, STOPREASON
	afterwalk: (O,def)=> {

	}
}

export default G

/*
// Painter has tolayer and can have condition, include
// Pod is map with positions, each have list of contexts
// returns state with painted stuff woo
Algol.paintSeedPod = function(state,painter,pod){
	//console.log("painting seed pod",pod)
	return pod.reduce(function(state,seeds,pos){
		var currentplr = state.getIn(["context","currentplayer"])
		return seeds.reduce(function(state,seed){
			state = state.mergeIn(["context"],seed);
			if (!painter.has("condition")||this.evaluateBoolean(state,painter.get("condition"))){
				var targetlayer = this.evaluateValue(state,painter.get("tolayer"));
				var entity = (painter.get("include")||I.Map()).map(function(def){
					return this.evaluateValue(state,def);
				},this);
				state = state.set("layers", entity.has("owner")
					? this.sortEntity(state.get("layers"),entity.set("pos",pos),[targetlayer],currentplr)
					: I.pushIn(state.get("layers"),[targetlayer,pos],entity));
			}
			return state;
		},state,this);
	},state,this).set("context",state.get("context"));
};






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
while(!(reason=stopreason(startstate,max,dir,pos,walk.length,blocks,steps,def.get("prioritizeblocksoversteps")))){
	walk.push(pos = startstate.getIn(["connections",pos,dir])||startstate.getIn(["connections",pos,dir+""]));
	if (tobecounted){
		counttrack.push(prevcounttotal = (prevcounttotal + (tobecounted.contains(pos)?1:0)));
	}
}
var context = I.Map({start:startpos,dir:dir,linelength:walk.length,stopreason:reason,max:max});
if (tobecounted){
	context = context.set("counttotal",prevcounttotal);
}
if (reason==="hitblock"){
	blockpos = startstate.getIn(["connections",pos,dir])||startstate.getIn(["connections",pos,dir+""]);
	context = context.set("blockpos",blockpos);
	recorder = I.pushIn(recorder,["block",blockpos],context.set("target",blockpos));
}
recorder = I.pushIn(recorder,["start",startpos],context);
_.each(walk,function(step,n){
	var ctx = context.set("target",step).set("step",n+1);
	if (tobecounted){
		ctx = ctx.set("countsofar",counttrack[n]);
	}
	if (n+1===walk.length){
		ctx = ctx.set("laststep",true);
		recorder = I.pushIn(recorder,["last",step],ctx);
	}
	recorder = I.pushIn(recorder,["steps",step],ctx);
});
return recorder;
*/
