import test from '../tester'
import lib from '../../../src/codegen/'

let C = lib.C

describe('the core funcs',()=>{
    test(C.boolean,'the boolean func', {
        'the morethan cmnd when true': {
            arg: ['morethan',3,2],
            expected: true
        },
        'the morethan cmnd when false': {
            arg: ['morethan',['value',2],2],
            expected: false
        },
        'the isempty cmnd for non-empty layer': {
            arg: ['isempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {foo:'bar'}} },
            expected: false
        },
        'the isempty cmnd for empty layer': {
            arg: ['isempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {}} },
            expected: true
        },
        'the isempty cmnd for nonexisting layer': {
            arg: ['isempty',['layer','somelayer']],
            scope: { LAYERS: {} },
            expected: true
        },
        'the notempty cmnd for non-empty layer': {
            arg: ['notempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {foo:'bar'}} },
            expected: true
        },
        'the notempty cmnd for empty layer': {
            arg: ['notempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {}} },
            expected: false
        },
        'the notempty cmnd for nonexisting layer': {
            arg: ['notempty',['layer','somelayer']],
            scope: { LAYERS: {} },
            expected: false
        },
        'the overlaps cmnd when given two overlapping layers': {
            arg: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { LAYERS: {l1: {a:[]}, l2: {a:[]}}},
            expected: true
        },
        'the overlaps cmnd when given two non-overlapping layers': {
            arg: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { LAYERS: {l1: {a:[]}, l2: {b:[]}}},
            expected: false
        },
        'the overlaps cmnd when given unexisting layers': {
            arg: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { LAYERS: {} },
            expected: false
        },
        'the anyat cmnd when pointing to layer with that pos': {
            arg: ['anyat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{a1:[]}}},
            expected: true
        },
        'the anyat cmnd when pointing to layer without pos': {
            arg: ['anyat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{}}},
            expected: false
        },
        'the anyat cmnd when pointing to nonexisting layer': {
            arg: ['anyat','mylayer',['pos','a1']],
            scope: {LAYERS:{}},
            expected: false
        },
        'the noneat cmnd when pointing to layer with that pos': {
            arg: ['noneat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{a1:[]}}},
            expected: false
        },
        'the noneat cmnd when pointing to layer without pos': {
            arg: ['noneat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{}}},
            expected: true
        },
        'the noneat cmnd when pointing to nonexisting layer': {
            arg: ['noneat','mylayer',['pos','a1']],
            scope: {LAYERS:{}},
            expected: true
        },
        'the same cmnd when same': {
            arg: ['same',4,['value',4]],
            expected: true
        },
        'the same cmnd when different': {
            arg: ['same',4,['value',3]],
            expected: false
        },
        'the different cmnd when same': {
            arg: ['different',4,['value',4]],
            expected: false
        },
        'the different cmnd when different': {
            arg: ['different',4,['value',3]],
            expected: true
        }
    });
    test(C.position,'the position func',{
        'the mark cmnd': {
            arg: ['mark','mymark'],
            scope: {
                MARKS: {mymark:'somepos'}
            },
            expected: 'somepos'
        }
    });
    test(C.value,'the value func',{
        'passing primitive': {
            arg: 123,
            expected: 123
        },
        'passing string': {
            arg: '123',
            expected: '123'
        },
        'the value cmnd': {
            arg: ['value','foo'],
            expected: 'foo'
        },
        'the otherplayer when player is 1': {
            arg: ['otherplayer'],
            options: {player:1},
            expected: 2
        },
        'the otherplayer when player is 2': {
            arg: ['otherplayer'],
            options: {player:2},
            expected: 1
        },
        'the sum cmnd also using currentplayer': {
            arg: ['sum',3,['value',2],['currentplayer']],
            options: {player:2},
            expected: 7
        },
        'the ctxval cmnd': {
            arg: ['ctxval',['value','someval']],
            scope: {
                CONTEXT: {someval:'foo'}
            },
            expected: 'foo'
        },
        'the playercase cmnd when plr1': {
            arg: ['playercase','foo','bar'],
            options: {player:1},
            expected: 'foo'
        },
        'the playercase cmnd when plr2': {
            arg: ['playercase','foo','bar'],
            options: {player:2},
            expected: 'bar'
        },
        'the dir cmnd': {
            arg: ['dir'],
            scope: {DIR:7},
            expected: 7
        }
    });
    test(C.set,'the set func',{
        'when given name of layer': {
            arg: 'mylayer',
            scope: { LAYERS: {mylayer:{a:1,b:2}} },
            expected: {a:1,b:2}
        },
        'the single cmnd': {
            arg: ['single',['mark','mymark']],
            scope: {
                MARKS: {mymark:'somepos'}
            },
            expected: {somepos:1}
        },
        'the layer cmnd when needs to valueify': {
            arg: ['layer',['value','mylayer']],
            scope: {
                LAYERS: {mylayer:{a:1,b:2}}
            },
            expected: {a:1,b:2}
        },
        'the layer cmnd with str': {
            arg: ['layer','mylayer'],
            scope: {
                LAYERS: {mylayer:{a:1,b:2}}
            },
            expected: {a:1,b:2}
        },
        'the intersect cmnd': {
            arg: ['intersect',['layer','layer1'],['layer','layer2']],
            scope: {
                LAYERS: {
                    layer1: {a:1,b:2},
                    layer2: {b:20,c:30}
                }
            },
            expected: {b:2}
        },
        'the intersect cmnd with many args': {
            arg: ['intersect',['layer','layer1'],['layer','layer2'],['layer','layer3']],
            scope: {
                LAYERS: {
                    layer1: {a:1,b:2,c:3},
                    layer2: {b:20,c:30},
                    layer3: {a:100,b:200}
                }
            },
            expected: {b:2}
        },
        'the subtract cmnd with many args': {
            arg: ['subtract',['layer','layer1'],['layer','layer2'],['layer','layer3']],
            scope: {
                LAYERS: {
                    layer1: {a:1,b:2,c:3,d:4},
                    layer2: {b:20,c:30},
                    layer3: {a:100,b:200}
                }
            },
            expected: {d:4}
        },
        'the union cmnd with many args': {
            arg: ['union',['layer','layer1'],['layer','layer2'],['layer','layer3']],
            scope: {
                LAYERS: {
                    layer1: {a:1},
                    layer2: {a:10,b:20},
                    layer3: {c:300}
                }
            },
            expected: {a:1,b:1,c:1}
        }
    })
});