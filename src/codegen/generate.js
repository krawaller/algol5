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
		if (def.start){
			ret += 'var STARTPOS='+C.position(O,def.start)+'; '
			ret += G.findanddrawneighboursfromstart(O,def)
			ret += G.drawneighbourstart(O,def);
		} else {
			ret += 'var neighbourstarts='+C.set(O,def.starts)+'; '
			ret += 'for(var STARTPOS in neighbourstarts){'
			ret += G.findanddrawneighboursfromstart(O,def)
			ret += G.drawneighbourstart(O,def);
			ret += '} '
		}
		return ret;
	},

	// assumes STARTPOS
	findanddrawneighboursfromstart: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.dir){
			if (U.contains(def,['dir'])){
				ret += 'var DIR='+C.value(O,def.dir)+'; '
				ret += G.findanddrawsingleneighbour(O,def)
			} else {
				ret += G.findanddrawsingleneighbour(O,def,C.value(O,def.dir))
			}
		} else {
			ret += G.findmanyneighbours(O,def);
			ret += 'var NEIGHBOURCOUNT=foundneighbours.length; '
			ret += G.drawmanyneighbours(O,def);
		}
		return ret
	},

	// assumes startpos
	findmanyneighbours: (O,def)=> {
		def = def || {}
		let ret = ''
		let usedir = U.contains(def.draw && def.draw.neighbours,['dir']);
		ret += 'var DIR; '
		ret += 'var foundneighbours = []; '
		ret += 'var neighbourdirs='+C.list(O,def.dirs)+'; '
		ret += 'var nbrofneighbourdirs=neighbourdirs.length; '
		if (usedir){
			ret += 'var foundneighbourdirs=[]; '	
		}
		ret += 'for(var dirnbr=0;dirnbr<nbrofneighbourdirs;dirnbr++){'
		ret += 'DIR=neighbourdirs[dirnbr]; '
		ret += G.findneighbourindir(O,def)
		ret += '} '
		return ret;
	},


	// wants full neighbour def
	// assumes STARTPOS, DIR, foundneighbours
	findneighbourindir: (O,def,dirtouse)=> {
		def = def || {}
		let ret = ''
		let usedir = U.contains(def.draw && def.draw.neighbours,['dir']);
		ret += 'var POS=connections[STARTPOS]['+(dirtouse||'DIR')+']; '
		ret += 'if (POS'+(def.condition ? ' && '+C.boolean(O,def.condition) : '')+'){'
		ret += 'foundneighbours.push(POS); '
		if (usedir){
			ret += 'foundneighbourdirs.push(DIR); '
		}
		ret += '} '
		return ret
	},

	// assumes POS, foundneighbours, NEIGHBOURCOUNT
	// and foundneighbourdirs if used!
	drawmanyneighbours: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.draw && def.draw.neighbours){
			let usedir = U.contains(def.draw.neighbours,['dir']);
			ret += 'for(var neighbournbr=0; neighbournbr < NEIGHBOURCOUNT; neighbournbr++){'
			ret += 'POS=foundneighbours[neighbournbr]; '
			if (usedir){
				ret += 'var DIR=foundneighbourdirs[neighbournbr]; '
			}
			ret += G.performdraw(O,def.draw.neighbours)
			ret += '} '
		}
		return ret
	},

	// wants full neighbour def
	// assumes STARTPOS, DIR
	findanddrawsingleneighbour: (O,def,dirtouse)=> {
		let ret = ''
		ret += 'var POS=connections[STARTPOS]['+(dirtouse||'DIR')+']; '
		ret += 'if (POS'+(def.condition ? ' && '+C.boolean(O,def.condition) : '')+'){'
		ret += 'var NEIGHBOURCOUNT=1; ' // TODO - only if someone cares!
		if (def.draw && def.draw.neighbours){
			ret += G.performdraw(O,def.draw.neighbours);
		}
		ret += '} '
		return ret
	},

	drawneighbourstart: (O,def)=> {
		def = def || {}
		let ret = ''
		if (def.draw && def.draw.start){
			if (U.contains(def.draw.start,['target'])){
				ret += 'POS=STARTPOS; '
				ret += G.performdraw(O,def.draw.start)
			} else {
				ret += G.performdraw(O,def.draw.start,'STARTPOS')
			}
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

	// we only ever add to artifact layers.
	addtolayer: (O,layer,pos,obj)=> 'ARTIFACTS['+layer+']['+pos+']='+obj+'; ',

	// assumes vartouse is defined (defaults to POS)
	performdraw: (O,def,vartouse)=> {
		vartouse = vartouse || 'POS'
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
			ret += 'var targetlayername='+C.value(O,def.tolayer)+'; '
			var prefix, owner = C.value(O,def.include.owner);
			if (owner === 0){
				prefix = '"neutral"';
			} else if (owner === O.player) {
				prefix = '"my"'
			} else if (_.isNumber(owner)) {
				prefix = '"opp"'
			} else {
				prefix = 'ownernames[artifact.owner]'
			}
			ret += 'var artifact='+G.artifactliteral(O,def)+'; '
			ret += G.addtolayer(O,'targetlayername',vartouse,'artifact')
			ret += G.addtolayer(O,prefix+' + targetlayername',vartouse,'artifact')
		} else {
			ret += G.addtolayer(O,C.value(O,def.tolayer),vartouse,G.artifactliteral(O,def))
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
