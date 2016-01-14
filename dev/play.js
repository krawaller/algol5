import T from '../src/codegen/core'


var LAYERS = {foo:{a1:[{bar:"BAZ"}]}},
	MARKS = {mark1:"a1"},
	code = T.boolean({},["and",["truthy",1],["falsy",0],["truthy",7]]);

console.log(code,eval(code));
