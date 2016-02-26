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
		: [def]
}

module.exports = U