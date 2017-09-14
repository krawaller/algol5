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

	pos2coords: (pos)=> ({
		x: colnametonumber[pos[0]],
		y: parseInt(pos.substr(1))
	}),

	coords2pos: (coords)=> colnumbertoname[coords.x]+coords.y,

	// already moved over
	contains: (haystack,needle)=> {
		if (isEqual(needle,haystack)){
			return true
		} else if (isArray(haystack) || isObject(haystack)){
			return some(haystack,child=> U.contains(child,needle))
		} else {
			return false
		}
	},

	// also already moved over
	possibilities: def=>
		def[0] === 'ifelse' ? U.possibilities(def[2]).concat(U.possibilities(def[3]))
		: def[0] === 'playercase' ? U.possibilities(def[1]).concat(U.possibilities(def[2]))
		: def[0] === 'if' ? U.possibilities(def[2])
		: def[0] === 'ifplayer' ? U.possibilities(def[2])
		: def[0] === 'indexlist' ? def[2]
		: [def],

	/*
	Parses command data to find all potential groups created by commands like spawn.
	Used in deduceUnitLayers
	*/
	// TODO - TRANSLATE: already moved over (as part of blankUnitLayers), so kill off when no local usage
	deduceDynamicGroups: (data)=> uniq(
		data[0] === "spawn" ? U.possibilities(data[2])
		: {setat:1,setid:1,setin:1}[data[0]] && U.contains(U.possibilities(data[2]),'group') ? U.possibilities(data[3])
		: isArray(data) || isObject(data) ? reduce(data,(mem,def)=>mem.concat(U.deduceDynamicGroups(def)),[])
		: []
	).sort()
});

