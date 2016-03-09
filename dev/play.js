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

let neighbourdef = {
	"type": "neighbour",
	"start": ["mark","mymark"],
	//"dirs": [1,2,3],
	"dir": 1,
	"condition": ["anyat","muppets",["target"]],
	"draw": {
		"neighbours": {
			"tolayer": ["ifelse",["true"],"dorklayer","borklayer"],
			"include": {
				"found": ["neighbourcount"],
				//"owner": ["read","board",["mark","mymark"],"fjupp"]
			}
		}
	}
}
let neighbourcode = lib.G.applyneighbours({player:2},neighbourdef)

let filterdef = {
	"type": "filter",
	"layer": "units",
	"matching": {
		foo: ['is','bar']
	},
	"tolayer": "dorklayer"
}
let filtercode = lib.G.applyfilter({player:1},filterdef)

console.log("\n***WALKER***\n",js_beautify(walkercode,{indent_size:2}))

console.log("\n***NEIGHBOUR***\n",js_beautify(neighbourcode,{indent_size:2}))

console.log("\n***FILTER***\n",js_beautify(filtercode,{indent_size:2}))
