import murus from '../games/defs/murusgallicus.json'

import lib from '../src/codegen'

import beautify from 'js-beautify'

console.log(beautify(lib.applyneighbours({},murus.generators.findmoveresults)))