import lib from '../src/codegen/'

import {js_beautify} from 'js-beautify'

let walkerdef = {
	"type": "walker",
	"starts": ["union","selectunit","mymorons"],
	"dir": 2,
	"blocks": "units",
	"draw": {
		"steps": {
			"tolayer": "targets"
		},
		"block": {
			"tolayer": "intheway",
			"include": {
				"owner": ['sum',1,1]
			}
		},
		"last": {
			"tolayer": "endedupat",
			"include": {
				"foo": "bar"
			}
		}
	}
};

let walkercode = lib.G.applywalker({player:1},walkerdef)

console.log(js_beautify(walkercode,{indent_size:2}))
