import lib from '../src/codegen/'

import {js_beautify} from 'js-beautify'

let walkerdef = {
	"type": "walker",
	"starts": "mymorons",
	"dir": 2,
	"blocks": "units",
	"draw": {
		"last": {
			"tolayer": "endedupat",
			"include": {
				"foo": ["read","board",["mark","mymark"],"mupp"]
			}
		}
	}
};

let walkercode = lib.G.applywalker({player:1},walkerdef)

console.log(js_beautify(walkercode,{indent_size:2}))
