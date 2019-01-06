let GAMES = require('../logic/dist/library');
let META = require('../logic/dist/meta');

export const games = GAMES;
export const meta = META;


// TODO - import? 
var colnametonumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split("").reduce(function(mem,char,n) {
	mem[char] = n+1;
	return mem;
},{});
const colnumbertoname = Object.keys(colnametonumber).reduce(function(mem,key){
  var val = colnametonumber[key];
  mem[val] = key;
  return mem;
},{});
export var coords2pos = function(coords) { return colnumbertoname[coords.x]+coords.y}
export var pos2coords = (pos)=> ({
  x: colnametonumber[pos[0]],
  y: parseInt(pos.substr(1))
});
