import _ from 'lodash'
import C from "./core"
import U from "../utils"

const G = {

	// ------------ FILTER STUFF -----------

	applyfilter: (O,def)=> {
		let ret = ''
		ret += 'var filtersourcelayer = '+C.layerref(O,def.layer)+'; '
		ret += 'for (var POS in filtersourcelayer){'
		ret += G.filterposition(O,def)
		ret += '}'
		return ret
	},

	// assumes filtersourcelayer, POS,
	filterposition: (O,def)=> {
		let ret = ''
		ret += 'var filtertargetlayername = '+C.value(O,def.tolayer)+'; ' // decide here since might depend on POS
		ret += 'if (filtersourcelayer[POS]){'
		ret += 'var filterobj = filtersourcelayer[POS]; '
		ret += G.filterobject(O,def)
		ret += '} '
		return ret
	},

	// assumes POS, filterobj, filtertargetlayername
	filterobject: (O,def)=> { // TODO - core datatype for matcher?
		let ret = ''
		let conds = (def.condition ? [C.boolean(O,def.condition)] : [])
		conds = conds.concat(_.map(def.matching,(test,key)=> C.prop(O,test,key) ))
		ret += 'if (' + conds.join(' && ') + '){'
		ret += G.addtolayer(O,'filtertargetlayername','POS','filterobj')
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
			if (U.contains(def,['dir'])){
				ret += 'var DIR='+C.value(O,def.dir)+'; '
				ret += G.findneighbourindir(O,def)
			} else {
				ret += G.findneighbourindir(O,def,C.value(O,def.dir))
			}
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
	findneighbourindir: (O,def,dirtouse)=> {
		def = def || {}
		let ret = ''
		ret += 'var POS=connections[STARTPOS]['+(dirtouse||'DIR')+']; '
		ret += 'if (POS'+(def.condition ? ' && '+C.boolean(O,def.condition) : '')+'){'
		ret += 'foundneighbours.push(POS); '
		ret += '} '
		return ret
	},

	afterneighbourlook: (O,def)=> {
		let ret = ''
		//if (def && U.contains(def.draw,['neighbourcount']) ) // no, because used in forloop
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
			ret += 'for(var neighbournbr=0; neighbournbr < NEIGHBOURCOUNT; neighbournbr++){'
			ret += 'POS=foundneighbours[neighbournbr]; '
			ret += G.performdraw(O,def.draw.neighbours)
			ret += '} '
		}
		return ret
	},

	// ------------ WALKER STUFF -----------

	applywalker: (O,def)=> {
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
		if (def.max)
			ret += 'var LENGTH=0; '
		ret += 'while(!(STOPREASON='+G.stopreason(O,def)+')){'
		ret += G.takewalkstep(O,def)
		if (def.max)
			ret += 'LENGTH++; '
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
			ret += 'var allowedsteps = '+C.set(O,def.steps)+'; '
		}
		if (def.blocks){
			ret += 'var BLOCKS = '+C.set(O,def.blocks)+'; '
		}
		if (def.count){
			ret += 'var walkpositionstocount = '+C.set(O,def.count)+'; '
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
			ret += 'countedwalkpositions.push(CURRENTCOUNT+=(walkpositionstocount[POS]?1:0)); '
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
			var usesstep = U.contains([def.draw.steps,def.draw.all,def.draw.counted],['step'])
			if (usesstep) ret += 'var STEP = 0; '
			ret += 'for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){'
			ret += 'POS=walkedsquares[walkstepper]; '
			if (usesstep) ret += 'STEP++; '
			if (def.count){
				ret += 'CURRENTCOUNT = countedwalkpositions[walkstepper]; '
			}
			if (def.draw.steps){
				ret += G.performdraw(O,def.draw.steps)
			}
			if (def.draw.all){
				ret += G.performdraw(O,def.draw.all)
			}
			if (def.draw.counted){
				ret += 'if (walkpositionstocount[POS]) {'
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
			if (U.contains(def.draw.last,['step'])) ret += 'STEP=WALKLENGTH; '
			ret += G.performdraw(O,def.draw.last)
		}
		return ret
	},

	// ------------ GENERAL STUFF -----------

	// assumes connections, DIR, LENGTH, nextpos
	// and if used BLOCKS, allowedsteps, MAX
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
			ret += '!allowedsteps[nextpos] ? "nomoresteps" : '
		}
		if (def.blocks && !def.testblocksbeforesteps){
			ret += 'BLOCKS[nextpos] ? "hitblock" : '
		}
		return '('+ret+' null)';
	},

	addtolayer: (O,layer,pos,obj)=> 'ARTIFACTS['+layer+']['+pos+']='+obj+'; ',

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
				} else { // TODO - lift out this array here! 
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
	},

	// called from instruction
	applyGenerator: (O,def)=> {
		switch(def.type){
			case 'walker': return G.applywalker(O,def)
			case 'neighbour': return G.applyneighbours(O,def)
			case 'filter': return G.applyfilter(O,def)
			default: throw 'Unknown generator def: '+def
		}
	}
}

export default G
