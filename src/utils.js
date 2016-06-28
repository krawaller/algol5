import isObject from 'lodash/lang/isObject'
import isArray from 'lodash/lang/isArray'
import isEqual from 'lodash/lang/isEqual'
import invert from 'lodash/object/invert'
import some from 'lodash/collection/some'
import reduce from 'lodash/collection/reduce'

/*
Helper functions which all returns actual values, not stringified
*/

const colnametonumber = reduce("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(""),(mem,char,n)=> {
    mem[char] = n+1;
    return mem;
},{});

const colnumbertoname = invert(colnametonumber)

const U = {

    offsetPos: (pos,dir,forward,right,board)=> {
        let forwardmods = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]], // x,y
            rightmods =   [[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1]],
            n = dir-1,
            coords = U.pos2coords(pos),
            newx = coords.x + forwardmods[n][0]*forward + rightmods[n][0]*right,
            newy = coords.y + forwardmods[n][1]*forward + rightmods[n][1]*right,
            withinbounds =  newx>0 && newx<=board.width && newy>0 && newy<=board.height;
        return withinbounds && U.coords2pos({x:newx,y:newy})
    },

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
	}
}

module.exports = U