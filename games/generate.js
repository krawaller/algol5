import lib from '../src/codegen/'

import fs from 'fs'

import {js_beautify} from 'js-beautify'

import daggers from './defs/daggers.json'
import amazon from './defs/amazon.json'

let code = lib.makeGameObject({rules:daggers});

code = `
	let makeGame = ${code};
	export default makeGame() 
`

code = js_beautify(code,{indent_size:2}).replace(/\n{1,}/g,'\n');

console.log(__dirname)
//console.log("\n***DAGGERS***\n",code)

fs.writeFileSync(__dirname+'/built/daggers.js',code);
