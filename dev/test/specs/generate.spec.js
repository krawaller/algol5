import test from '../gentester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the generate funcs',()=>{
    test(G.addtolayer,'the addtolayer func',{
        'when nothing at that pos': {
            args: ['"mylayer"','"a1"','"foo"'],
            scope: {LAYERS:{mylayer:{}}},
            mutations: {LAYERS:{mylayer:{a1:["foo"]}}}
        },
        'when stuff already there': {
            args: ['"mylayer"','"a1"','"foo"'],
            scope: {LAYERS:{mylayer:{a1:["bar"]}}},
            mutations: {LAYERS:{mylayer:{a1:["bar","foo"]}}}
        }
    })
    test(G.performdraw,'the performdraw func',{
        'with no owner or condition and nothing at the pos': {
            arg: {tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,LAYERS:{somelayer:{}}},
            mutations: {LAYERS:{somelayer:{x:[{heading:1}]}}}
        },
        'with no owner or condition and previous at the pos': {
            arg: {tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,LAYERS:{somelayer:{x:['foo']}}},
            mutations: {LAYERS:{somelayer:{x:['foo',{heading:1}]}}}
        },
        'with condition which evaluates to false': {
            arg: {condition:['truthy',0],tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,LAYERS:{somelayer:{}}},
            mutations: {LAYERS:{somelayer:{}}}
        },
        'with condition which evaluates to true': {
            arg: {condition:['truthy',1],tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,LAYERS:{somelayer:{}}},
            mutations: {LAYERS:{somelayer:{x:[{heading:1}]}}}
        },
        'with owner which is opp': {
            options: {player:1},
            arg: {tolayer:'muppets',include:{owner:2}},
            scope: {POS:'x',LAYERS:{muppets:{},oppmuppets:{}}},
            mutations: {LAYERS:{muppets:{x:[{owner:2}]},oppmuppets:{x:[{owner:2}]}}}
        },
        'with owner which is my': {
            options: {player:2},
            arg: {tolayer:'muppets',include:{owner:2}},
            scope: {POS:'x',LAYERS:{muppets:{},mymuppets:{}}},
            mutations: {LAYERS:{muppets:{x:[{owner:2}]},mymuppets:{x:[{owner:2}]}}}
        },
        'with owner which is neutral': {
            options: {player:1},
            arg: {tolayer:'muppets',include:{owner:['dir']}},
            scope: {DIR:0,POS:'x',LAYERS:{muppets:{},neutralmuppets:{}}},
            mutations: {LAYERS:{muppets:{x:[{owner:0}]},neutralmuppets:{x:[{owner:0}]}}}
        }
    });
    test(G.artifactliteral,'the artifactliteral func',{
        'when no includes': {
            arg: {what:'ever'},
            expected: {}
        },
        'when we have an include': {
            arg: {include:{heading:['dir'],limit:['max']}},
            scope: {DIR:1,MAX:5},
            expected: {heading:1,limit:5}
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
        },
        'when we are floating and we have already floated over that square': {
            arg: {type:'floater'},
            scope: {
                CONNECTIONS: {pos:{1:'sqr'}},
                REACHED: {sqr:true},
                DIR: 1,
                POS: 'pos',
                NEXTPOS: 'whatev'
            },
            expected: 'alreadyreached'
        }
    });
});