import _ from 'lodash'

const U = {
	contains: (haystack,needle)=> {
	    if (_.isEqual(needle,haystack)){
	        return true
	    } else if (_.isArray(haystack) || _.isObject(haystack)){
	        return _.some(haystack,child=> U.contains(child,needle))
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