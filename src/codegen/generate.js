import _ from 'lodash'
import C from "./core"

const G = {

	// ------------ FLOATER STUFF -----------

/*
we have a positionset in FLOATFROM and NEWREACHED, after we're done we set NEWREACHED as the new FLOATFROM

*/

	// assumes STARTPOS
	prepfloatfromstart: (O,def)=> {
		let ret = ''
		ret += 'var TOTALREACHED = 0; '
		ret += 'var LASTLEVEL = 0; '
		ret += 'var NEWLYREACHED = {}; '
		ret += 'var REACHED = {}; '
		ret += 'var FLOATFROM = {}; '
		ret += 'var LENGTH = 1; '
		ret += 'FLOATFROM[STARTPOS]=1; '
		return ret
	},

	floatforth: (O,def)=> {
		let ret = ''
		ret += 'do {'
		ret += G.floatexpansion(O,def)
		ret += '} while (TOTALREACHED > LASTLEVEL)'
		return ret
	},

	// assumes
	floatexpansion: (O,def)=> {
		let ret = ''
		ret += 'NEWREACHED = {}; '
		ret += 'LASTLEVEL = TOTALREACHED; '
		ret += 'for(var POS in FLOATFROM){'
		ret += G.floatfrompos(O,def)
		ret += '} '
		ret += 'FLOATFROM = NEWREACHED; '
		ret += 'LENGTH++; '
		return ret
	},

	// assumes POS
	floatfrompos: (O,def)=> {
		let ret = ''
		if (def.dirs){
			ret += 'var DIRS='+C.list(O,def.dirs)+'; '
			ret += 'var nbrofdirs=DIRS.length; '
			ret += 'for(var dirnbr=0;dirnbr<nbrofdirs;dirnbr++){'
			ret += 'var DIR=DIRS[dirnbr]; '
			ret += G.floatindir(O,def)
			ret += '} '
		} else {
			ret += 'var DIR='+C.value(O,def.dir)+'; '
			ret += G.floatindir(O,def)
		}
		return ret
	},

	// assumes POS, DIR, REACHED, NEWREACHED, LENGTH, TOTALREACHED
	floatindir: (O,def)=> {
		let ret = ''
		ret += 'var STOPREASON; '
		ret += 'var nextpos; '
		ret += 'if (!(STOPREASON='+G.stopreason(O,def)+')){ '
		ret += 'NEWREACHED[nextpos]=LENGTH; '
		ret += 'REACHED[nextpos]=LENGTH; '
		ret += 'TOTALREACHED++; '
		if (def.blocks){
			ret += '} else if (BLOCKS[nextpos]){'
			ret += 'BLOCKSREACHED[nextpos]=LENGTH; '
			ret += '} '
		} else {
			ret += '} '
		}
		return ret
	},

	// ------------ FILTER STUFF -----------

	applyfilter: (O,def)=> {
		let ret = ''
		ret += 'var filtersourcelayer = '+C.layerref(O,def.layer)+'; '
		ret += 'for (var POS in filtersourcelayer){'
		ret += G.tryposition(O,def)
		ret += '}'
		return ret
	},

	// assumes filtersourcelayer, POS,
	tryposition: (O,def)=> {
		let ret = ''
		ret += 'var filtertargetlayername = '+C.value(O,def.tolayer)+'; ' // decide here since might depend on POS
		ret += 'if (filtersourcelayer[POS]){'
		ret += 'var OBJ = filtersourcelayer[POS]; '
		ret += G.tryobj(O,def)
		ret += '} '
		return ret
	},

	// assumes POS, OBJ, filtertargetlayername
	tryobj: (O,def)=> { // TODO - core datatype for matcher?
		let ret = ''
		let conds = (def.condition ? [C.boolean(O,def.condition)] : [])
		conds = conds.concat(_.map(def.matching,(test,key)=> C.prop(O,test,key) ))
		ret += 'if (' + conds.join(' && ') + '){'
		ret += G.addtolayer(O,'filtertargetlayername','POS','OBJ')
		ret += '} '
		return ret
	},

	// ------------ NEIGHBOUR STUFF -----------

	applyneighbours: (O,def)=> {
		let ret = ''
		ret += G.findneighbours(O,def)
		ret += G.afterneighbourlook(O,def)
		ret += G.drawneighbourstart(O,def)
		ret += G.drawneighbourtargets(O,def)
		return ret
	},

	findneighbours: (O,def)=> {
		def = def || {}
		let ret = ''
		ret += 'var foundneighbours=[]; '
		if (def.start){
			ret += 'var STARTPOS='+C.position(O,def.start)+'; '
			ret += G.findneighboursfromstart(O,def)
		} else {
			ret += 'var STARTPOS; '
			ret += 'var neighbourstarts='+C.set(O,def.starts)+'; '
			ret += 'for(var STARTPOS in neighbourstarts){'
			ret += G.findneighboursfromstart(O,def)
			ret += '} '
		}
		return ret;
	},

	findneighboursfromstart: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.dir){
			ret += 'var DIR='+C.value(O,def.dir)+'; '
			ret += G.findneighbourindir(O,def)
		} else {
			ret += 'var DIR; '
			ret += 'var neighbourdirs='+C.list(O,def.dirs)+'; '
			ret += 'var nbrofneighbourdirs=neighbourdirs.length; '
			ret += 'for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){'
			ret += 'DIR=neighbourdirs[dirnbr]; '
			ret += G.findneighbourindir(O,def)
			ret += '} '
		}
		return ret
	},

	// wants full neighbour def
	// assumes STARTPOS, DIR, foundneighbours
	findneighbourindir: (O,def)=> {
		def = def || {}
		let ret = ''
		ret += 'var POS=connections[STARTPOS][DIR]; '
		ret += 'if (POS'+(def.condition ? ' && '+C.boolean(O,def.condition) : '')+'){'
		ret += 'foundneighbours.push(POS); '
		ret += '} '
		return ret
	},

	afterneighbourlook: (O,def)=> {
		let ret = ''
		ret += 'var NEIGHBOURCOUNT=foundneighbours.length; '
		return ret
	},

	drawneighbourstart: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.draw && def.draw.start){
			ret += 'POS=STARTPOS; '
			ret += G.performdraw(O,def.draw.start)
		}
		return ret
	},

	drawneighbourtargets: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.draw && def.draw.neighbours){
			ret += 'for(var neighbournbr in foundneighbours){'
			ret += 'POS=[foundneighbours[neighbournbr]]; '
			ret += G.performdraw(O,def.draw.neighbours)
			ret += '} '
		}
		return ret
	},

	// ------------ WALKER STUFF -----------

	decideWalkerOpts: (def)=> { // TODO - should we maybe analyse the generated func instead of the def? hmm.
		let ret = {}
		ret.useswalkstep = _.some(def.draw,(instr,name)=> _.some(instr.include, (val,key)=> (JSON.stringify([val]).match(/\[ *'step' *\]|\[ *"step" *\]/))))
		return ret
	},

	applywalker: (O,def)=> {
		O = Object.assign(G.decideWalkerOpts(def),O||{})
		let ret = ''
		if (def.starts){
			ret += 'var walkstarts = '+C.set(O,def.starts)+'; '
			ret += 'for(var STARTPOS in walkstarts){'
			ret += G.walkfromstart(O,def)
			ret += '} '
		} else {
			ret += 'var STARTPOS='+C.position(O,def.start)+'; '
			ret += G.walkfromstart(O,def)
		}
		return ret
	},
	// wants full walkerdef. 
	// assumes STARTPOS, connections
	walkfromstart: (O,def)=> {
		let ret = ''
		if (def.dirs){
			ret += 'var DIR; '
			ret += 'var allwalkerdirs = '+C.list(O,def.dirs)+'; '
			ret += 'var nbrofwalkerdirs = allwalkerdirs.length; '
			ret += 'for(var walkerdirnbr=0; walkerdirnbr<nbrofwalkerdirs; walkerdirnbr++){'
			ret += 'DIR = allwalkerdirs[walkerdirnbr]; '
			ret += G.walkindir(O,def)
			ret += '} '
		} else {
			ret += 'var DIR='+C.value(O,def.dir)+'; '
			ret += G.walkindir(O,def)
		}
		return ret
	},
	// wants full walkerdef. 
	// assumes STARTPOS, DIR, connections
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
		ret += G.drawwalklast(O,def)
		return ret;
	},
	// ASSUMES STARTPOS, DIR
	prepwalkstart: (O,def)=> {
		def = def || {}
		let ret =  ''
		ret += 'var walkedsquares = []; '
		ret += 'var STOPREASON = ""; '
		ret += 'var nextpos = ""; '
		if (def.max){
			ret += 'var MAX='+C.value(O,def.max)+'; '
		}
		if (def.startasstep){
			ret += 'var POS = "faux"; '
			ret += 'connections.faux[DIR]=STARTPOS; '
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
			ret += 'var countedwalkpositions = []; '
			ret += 'var CURRENTCOUNT = 0; '
		}
		return ret;
	},
	// ASSUMES nextpos, ..
	takewalkstep: (O,def)=> {
		def = def || {}
		let ret = 'POS = nextpos; '
		ret += 'walkedsquares.push(nextpos); '
		if (def.count){
			ret += 'countedwalkpositions.push(CURRENTCOUNT+=(COUNT[POS]?1:0)); '
		}
		return ret;
	},
	// wants full walkerdef.
	afterwalk: (O,def)=> {
		let ret = ''
		ret += 'var WALKLENGTH = walkedsquares.length; '
		if (def && def.count){
			ret += 'var TOTALCOUNT = CURRENTCOUNT; '
		}
		return ret;
	},
	// wants full walkerdef
	drawwalkblock: (O,def)=> {
		let ret = ''
		if (def.blocks && def.draw.block){
			ret += 'if (STOPREASON==="hitblock"){' 
			ret += 'POS=nextpos; '
			ret += G.performdraw(O,def.draw.block);
			if (def.draw.all){
				ret += G.performdraw(O,def.draw.all);
			}
			ret += '} '
		}
		return ret
	},
	// wants full walkerdef
	drawwalksteps: (O,def)=> { // TODO - only use STEP if we care!
		let ret = ''
		if (def.draw.steps || def.draw.all || def.draw.counted){
			var usesstep = C.contains([def.draw.steps,def.draw.all,def.draw.counted],['step'])
			if (usesstep) ret += 'var STEP = 0; '
			ret += 'for(var stepper=0;stepper<WALKLENGTH;stepper++){'
			ret += 'POS=walkedsquares[stepper]; '
			if (usesstep) ret += 'STEP++; '
			if (def.count){
				ret += 'CURRENTCOUNT = countedwalkpositions[stepper]; '
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
	// wants full walkerdef. 
	drawwalklast: (O,def)=> {
		let ret = ''
		if (def.draw.last){
			ret += 'POS=walkedsquares[WALKLENGTH-1]; '
			if (C.contains(def.draw.last,['step'])) ret += 'STEP=WALKLENGTH; '
			ret += G.performdraw(O,def.draw.last)
		}
		return ret
	},

	// ------------ GENERAL STUFF -----------

	// assumes connections, DIR, LENGTH, nextpos
	// and if used BLOCKS, STEPS, MAX
	stopreason: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.max){
			ret += 'LENGTH === MAX ? "reachedmax" : '
		}
		ret += '!(nextpos=connections[POS][DIR]) ? "outofbounds" : '
		if (def.type==='floater'){
			ret += 'REACHED[nextpos] ? "alreadyreached" : '
		}
		if (def.blocks && def.steps && def.testblocksbeforesteps){
			ret += 'BLOCKS[nextpos] ? "hitblock" : '
		}
		if (def.steps){
			ret += '!STEPS[nextpos] ? "nomoresteps" : '
		}
		if (def.blocks && !def.testblocksbeforesteps){
			ret += 'BLOCKS[nextpos] ? "hitblock" : '
		}
		return '('+ret+' null)';
	},

	addtolayer: (O,layer,pos,obj)=> {
		let ret = ''
		ret += 'ARTIFACTS['+layer+']['+pos+']='+obj+'; '
		return ret
	},

	// assumes POS
	performdraw: (O,def)=> {
		let ret = ''
		if (def.condition){
			ret += 'if ('+C.boolean(O,def.condition)+'){ '
		}
		if (def.include && def.include.owner){ // if artifact has owner it must be added to more than one layer
			ret += 'var artifact='+G.artifactliteral(O,def)+'; '
			ret += 'var targetlayername='+C.value(O,def.tolayer)+'; '
			ret += G.addtolayer(O,'targetlayername','POS','artifact')
			if (def.include && def.include.owner){
				var prefix, owner = C.value(O,def.include.owner);
				if (owner === 0){
					prefix = '"neutral"';
				} else if (owner === O.player) {
					prefix = '"my"'
				} else if (_.isNumber(owner)) {
					prefix = '"opp"'
				} else {
					prefix = '["neutral",'+(O.player===1?'"my","opp"':'"opp","my"')+'][artifact.owner]'
				}
				ret += G.addtolayer(O,prefix+' + targetlayername','POS','artifact')
			}
		} else {
			ret += G.addtolayer(O,C.value(O,def.tolayer),'POS',G.artifactliteral(O,def))
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
