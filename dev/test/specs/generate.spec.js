import test from '../tester'
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
});