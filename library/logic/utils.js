import * as isObject from 'lodash/isObject'
import * as isArray from 'lodash/isArray'
import * as isEqual from 'lodash/isEqual'
import * as isString from 'lodash/isString'
import * as invert from 'lodash/invert'
import * as some from 'lodash/some'
import * as reduce from 'lodash/reduce'
import * as filter from 'lodash/filter'
import * as range from 'lodash/range'
import * as indexOf from 'lodash/indexOf'
import * as uniq from 'lodash/uniq'

const colnametonumber = reduce("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(""),(mem,char,n)=> {
	mem[char] = n+1;
	return mem;
},{});

const colnumbertoname = invert(colnametonumber)


/*
Helper functions which all returns actual values, not stringified
*/

export default U => Object.assign(U,{

	getTerrain: (O)=> Object.assign({},
		O && O.rules && O.rules.board && O.rules.board.terrain || {},
		O && O.rules && O.rules.AI && O.rules.AI.terrain || {}
	),

	needLevel: (O,expr)=>
		U.contains(expr,['dir']) ? 'loop' :
		U.contains(expr,['start']) ? 'dir' : 
		'start',

	needsWalkPath: (O,def)=> !U.drawDuringWhile(O,def) || U.needsWalkLength(O,def),

	needsWalkLength: (O,def)=> def.draw.last || U.contains(def.draw,['walklength']),

	drawDuringWhile: (O,def)=> (
		def && def.draw && 
		!U.contains([def.draw.steps,def.draw.all],['totalcount']) && 
		!U.contains([def.draw.steps,def.draw.all],['walklength'])
	),

	needsStopreason: (O,actiondef)=> actiondef.draw.blocks || U.contains(actiondef,['stopreason']),

	startRules: (O)=> O && O.rules && O.rules.startTurn || {},

	markRules: (O)=> O && O.rules && O.rules.marks && O.rules.marks[O.markname] || {},

	cmndRules: (O)=> O && O.rules && O.rules.commands && O.rules.commands[O.cmndname] || {},

	pos2coords: (pos)=> ({
		x: colnametonumber[pos[0]],
		y: parseInt(pos.substr(1))
	}),

	coords2pos: (coords)=> colnumbertoname[coords.x]+coords.y,

	contains: (haystack,needle)=> {
		if (isEqual(needle,haystack)){
			return true
		} else if (isArray(haystack) || isObject(haystack)){
			return some(haystack,child=> U.contains(child,needle))
		} else {
			return false
		}
	},

	possibilities: def=>
		def[0] === 'ifelse' ? U.possibilities(def[2]).concat(U.possibilities(def[3]))
		: def[0] === 'playercase' ? U.possibilities(def[1]).concat(U.possibilities(def[2]))
		: def[0] === 'if' ? U.possibilities(def[2])
		: def[0] === 'ifplayer' ? U.possibilities(def[2])
		: def[0] === 'indexlist' ? def[2]
		: [def],

	listlength: def=> {
		if (def[0] === 'list'){
			return U.listlength(def[1]);
		} else if (def[0] === 'playercase'){
			let len1 = U.listlength(def[1])
			let len2 = U.listlength(def[2])
			return len1 && len2 && len1 === len2 ? len1 : undefined;
		} else if (def[0] === 'ifelse'){
			let len1 = U.listlength(def[2])
			let len2 = U.listlength(def[3])
			return len1 && len2 && len1 === len2 ? len1 : undefined;
		} else {
			return def.length;
		}
	},

	/*
	Parses command data to find all potential groups created by commands like spawn.
	Used in deduceUnitLayers
	*/
	deduceDynamicGroups: (data)=> uniq(
		data[0] === "spawn" ? U.possibilities(data[2])
		: {setat:1,setid:1,setin:1}[data[0]] && U.contains(U.possibilities(data[2]),'group') ? U.possibilities(data[3])
		: isArray(data) || isObject(data) ? reduce(data,(mem,def)=>mem.concat(U.deduceDynamicGroups(def)),[])
		: []
	).sort()
});

