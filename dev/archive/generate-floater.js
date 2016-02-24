	// ------------ FLOATER STUFF -----------

/*
we have a positionset in FLOATFROM and NEWREACHED, after we're done we set NEWREACHED as the new FLOATFROM

*/

	// assumes STARTPOS
	prepfloatfromstart: (O,def)=> {
		let ret = ''
		ret += 'var TOTALREACHED = 0; '
		ret += 'var LASTLEVEL = 0; '
		ret += 'var NEWREACHED = {}; '
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