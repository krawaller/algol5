import test from '../tester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the generate funcs',()=>{
    test(G.prepwalkstart,'the prepwalkstart func', {
        'for vanilla def': {
            scope: {CONTEXT: {some:'val'},DIR: 7, STARTPOS: 'somepos'},
            mutations: {CONTEXT: {some:'val',dir: 7, start: 'somepos'}}
        },
        'when def has max': {
            arg: {max:['value',4]},
            scope: {CONTEXT: {some:'val'},DIR: 7, STARTPOS: 'somepos'},
            mutations: {CONTEXT: {some:'val',dir: 7, start: 'somepos', max: 4}, MAX: 4}
        }
    });
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
            expected: 'hitblock',
            mutations: {NEXTPOS:'newpos'}
        },
        'when out of steps': {
            arg: {steps:"yes"},
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:'',STEPS:{}},
            expected: 'nomoresteps',
            mutations: {NEXTPOS:'newpos'}
        },
        'when navigates blocks and has steps and not reaching max': {
            arg: {steps:"yes",blocks:"indeed",max:"yup"},
            scope: {LENGTH:2,MAX:3,CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:'',STEPS:{'newpos':1},BLOCKS:{}},
            expected: null,
            mutations: {NEXTPOS:'newpos'}
        },
        'when there is connection and def doesnt use blocks or steps or max': {
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:''},
            expected: null,
            mutations: {NEXTPOS:'newpos'}
        },
        'when steps run out and there is a block in the way': {
            arg: {blocks:"yes",steps:"indeed"},
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:'',BLOCKS:{newpos:1},STEPS:{}},
            expected: 'nomoresteps',
            mutations: {NEXTPOS:'newpos'}
        },
        'when steps run out and there is a block in the way and we prio blocks': {
            arg: {blocks:"yes",steps:"indeed",testblocksbeforesteps:true},
            scope: {CONNECTIONS:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',NEXTPOS:'',BLOCKS:{newpos:1},STEPS:{}},
            expected: 'hitblock',
            mutations: {NEXTPOS:'newpos'}
        }
    });
});