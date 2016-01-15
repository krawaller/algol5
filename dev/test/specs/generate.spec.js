import test from '../tester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the generate funcs',()=>{
    test(G.stopreason,'the stopreason func', {
        'when def has max and we have reached it': {
            arg: {max:3},
            scope: {LENGTH:3,MAX:3},
            expected: 'reachedmax'
        },
        'when out of bounds': {
            scope: {CONNECTIONS:{pos:{}},DIR:'x',POS:'pos',NEXTPOS:''},
            expected: 'outofbounds'
        },
        'when hit a block': {
            arg: {blocks:"yes"},
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:'',BLOCKS:{newpos:1}},
            expected: 'hitblock' 
        },
        'when out of steps': {
            arg: {steps:"yes"},
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:'',STEPS:{}},
            expected: 'nomoresteps' 
        },
        'when navigates blocks and has steps': {
            arg: {steps:"yes",blocks:"indeed"},
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:'',STEPS:{'newpos':1},BLOCKS:{}},
            expected: null
        },
        'when there is connection and def doesnt use blocks or steps or max': {
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:''},
            expected: null
        }
    }); // TODO - prio block over steps thing! Also test mutation of NEXTPOS
});