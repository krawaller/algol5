import U from "../utils"

export default C => Object.assign(C,{

	/*
	draw directly in whileloop if:
	def.draw.steps and def.draw.all doesn't contain walklength or totalcount
	*/
	applywalker: (O,def)=> {
		let ret = ''
		if (def && def.draw && !U.contains([def.draw.steps,def.draw.all],['totalcount']) && !U.contains([def.draw.steps,def.draw.all],['walklength'])){
			O = {drawduringwhile: true, ...O}
		}
		if (def.starts){
			ret += 'var walkstarts = '+C.set(O,def.starts)+'; '
			ret += 'for(var STARTPOS in walkstarts){'
			ret += C.walkfromstart(O,def)
			ret += '} '
		} else {
			ret += 'var STARTPOS='+C.position(O,def.start)+'; '
			ret += C.walkfromstart(O,def)
		}
		return ret
	},
	// wants full walkerdef. 
	// assumes STARTPOS, connections
	walkfromstart: (O,def)=> {
		let ret = '', usefordir
		if (def.dirs){
			ret += 'var allwalkerdirs = '+C.list(O,def.dirs)+'; ' // TODO - extract if not dynamic
			let predictednbrofdirs = U.listlength(def.dirs),
				nbrvar = predictednbrofdirs;
			if (!predictednbrofdirs){
				ret += 'var nbrofwalkerdirs = allwalkerdirs.length; '
				nbrvar = 'nbrofwalkerdirs'
			}
			ret += 'for(var walkerdirnbr=0; walkerdirnbr<'+nbrvar+'; walkerdirnbr++){'
			if (U.contains(def.draw,['dir'])){
				ret += 'var DIR = allwalkerdirs[walkerdirnbr]; '
			} else {
				usefordir = 'allwalkerdirs[walkerdirnbr]'
			}
			ret += C.walkindir(O,def,usefordir)
			ret += '} '
		} else {
			if (U.contains(def.draw,['dir'])){
				ret += 'var DIR = '+C.value(O,def.dir)+'; '
			} else {
				usefordir = C.value(O,def.dir)
			}
			ret += 'var DIR='+C.value(O,def.dir)+'; '
			ret += C.walkindir(O,def,usefordir)
		}
		return ret
	},
	// wants full walkerdef. 
	// assumes STARTPOS, connections
	walkindir: (O,def,usefordir)=> {
		let ret = ''
		ret += C.prepwalkstart(O,def)
		if (def.max){
			ret += 'var LENGTH=0; '
		}
		if (O && O.drawduringwhile && U.contains([def.draw.steps,def.draw.all],['step'])){
			ret += 'var STEP=0; '
		}
		ret += 'while(!(STOPREASON='+C.stopreason(O,def,usefordir)+')){'
		ret += C.takewalkstep(O,def)
		if (def.max)
			ret += 'LENGTH++; '
		if (O && O.drawduringwhile){
			ret += C.drawwalksinglestep(O,def)
		}
		ret += '}'
		ret += C.afterwalk(O,def)
		ret += C.drawwalkblock(O,def)
		ret += C.drawwalkstart(O,def)
		if (!(O && O.drawduringwhile)){
			ret += C.drawwalksteps(O,def)
		}
		ret += C.drawwalklast(O,def)
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
		let ret = 'walkedsquares.push(POS = nextpos); '
		if (def.count){
			ret += 'countedwalkpositions.push(CURRENTCOUNT+=(walkpositionstocount[POS]?1:0)); '
		}
		if (def.draw && def.draw.steps && !U.contains(def.draw.steps,['walklength'])){
			//ret += 
		}
		return ret;
	},
	// wants full walkerdef.
	afterwalk: (O,def)=> {
		def = def || {}
		def.draw = def.draw || {}
		let ret = ''
		if (def.draw.steps || def.draw.last || U.contains(def.draw,['walklength'])){
			ret += 'var WALKLENGTH = walkedsquares.length; '
		}
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
			var usesstep = U.contains([def.draw.steps,def.draw.all,def.draw.counted],['step'])
			if (usesstep) ret += 'var STEP = 0; '
			ret += 'for(var walkstepper=0;walkstepper<WALKLENGTH;walkstepper++){'
			ret += 'POS=walkedsquares[walkstepper]; '
			ret += C.drawwalksinglestep(O,def)
			ret += '}'
		}
		return ret
	},
	drawwalksinglestep: (O,def)=> {
		var usesstep = U.contains([def.draw.steps,def.draw.all,def.draw.counted],['step'])
		let ret = '';
		if (usesstep) ret += 'STEP++; '
		if (def.count){
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
			var needspos = U.contains([def.draw.start,def.draw.all],['target']);
			if (needspos){
				ret += 'POS=STARTPOS; '
			}
			ret += C.performdraw(O,def.draw.start, needspos ? 0 : 'STARTPOS');
			if (def.draw.all){
				ret += C.performdraw(O,def.draw.all, needspos ? 0 : 'STARTPOS');
			}
		}
		return ret
	},
	// wants full walkerdef. 
	drawwalklast: (O,def)=> {
		let ret = ''
		if (def.draw.last){
			if (U.contains(def.draw.last,['step'])) ret += 'STEP=WALKLENGTH; '
			if (U.contains(def.draw.last,['target'])) {
				ret += 'POS=walkedsquares[WALKLENGTH-1]; '
				ret += C.performdraw(O,def.draw.last)
			} else {
				ret += C.performdraw(O,def.draw.last,'walkedsquares[WALKLENGTH-1]')
			}
		}
		return ret
	}
})
