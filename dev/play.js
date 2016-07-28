import lib from '../src/codegen/'

import {js_beautify} from 'js-beautify'

import daggers from '../games/daggers.json'
import amazon from '../games/amazon.json'

let code = lib.makeGameObject({rules:amazon});
console.log("\n***DAGGERS***\n",js_beautify(code,{indent_size:2}))


/*

let walkerdef = {
	"type": "walker",
	"starts": "mymorons",
	"dirs": [1,2],
	"blocks": "units",
	"draw": {
		"start": {
			"tolayer": "starts"
		},
		"steps": {
			"tolayer": "steps"
		},
		"last": {
			"tolayer": "endedupat",
			"include": {
				"foo": ["read","board",["mark","mymark"],"mupp"]
			}
		}
	}
};
let walkercode = lib.applywalker({player:1},walkerdef)

let neighbourdef = {
	"type": "neighbour",
	"starts": ["layer","mylayer"],
	"dirs": [1,2,3],
	//"dir": 1,
	"condition": ["anyat","muppets",["target"]],
	"draw": {
		"start": {
			"tolayer": "fnork",
			"include": {
				//"found": ["neighbourcount"],
				"where": ["pos",["target"]]
			}
		},
		"neighbours": {
			"tolayer": ["ifelse",["true"],"dorklayer","borklayer"],
			"include": {
				//"from": ["dir"],
				"owner": ["read","board",["mark","mymark"],"fjupp"],
				//"found": ["neighbourcount"]
			}
		}
	}
}
let neighbourcode = lib.applyneighbours({player:2},neighbourdef)

let filterdef = {
	"type": "filter",
	"layer": "units",
	"matching": {
		foo: ['is','bar']
	},
	"tolayer": "dorklayer"
}
let filtercode = lib.applyfilter({player:1},filterdef)

console.log("\n***WALKER***\n",js_beautify(walkercode,{indent_size:2}))

console.log("\n***NEIGHBOUR***\n",js_beautify(neighbourcode,{indent_size:2}))

console.log("\n***FILTER***\n",js_beautify(filtercode,{indent_size:2}))
*/