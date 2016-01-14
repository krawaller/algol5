import C from '../src/codegen/core'
import E from '../src/codegen/effect'


let UNITS = {foo:{pos:"start"},bar:{}},
	LAYERS = {units:{"t1":[{id:"bar"}]}},
	MARKS = {selectmove:"goal","selecttarget":"t1"},
	CONTEXT = {someval:"abc"}


let setcode = E.set1at({},["mark","selecttarget"],["ctxval","someval"],"def"),
	movecode = E.moveid({},"foo",["mark","selectmove"]),
	killcode = E.kill1at({},["pos","t1"]),
	boguskillcode = E.kill1at({},["pos","nowhere"]),
	spawncode = E.spawn({player:666},["pos","there"],"dorks",["currentplayer"],{mesgrad:["value","high"],fisgrad:"low"})

console.log("MOVE",movecode,"\nKILL",killcode,"\nSPAWN",spawncode)

eval(setcode)
eval(movecode)
eval(killcode)
eval(boguskillcode)
eval(spawncode)

console.log("After",UNITS)

