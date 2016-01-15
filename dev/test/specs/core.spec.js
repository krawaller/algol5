import expressionTester from '../expressiontester'

expressionTester({
    boolean: {
        'the morethan cmnd when true': {
            def: ['morethan',3,2],
            expected: true
        },
        'the morethan cmnd when true': {
            def: ['morethan',3,2],
            expected: true
        },
        'the isempty cmnd for non-empty layer': {
            def: ['isempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {foo:'bar'}} },
            expected: false
        },
        'the isempty cmnd for empty layer': {
            def: ['isempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {}} },
            expected: true
        },
        'the isempty cmnd for nonexisting layer': {
            def: ['isempty',['layer','somelayer']],
            scope: { LAYERS: {} },
            expected: true
        },
        'the notempty cmnd for non-empty layer': {
            def: ['notempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {foo:'bar'}} },
            expected: true
        },
        'the notempty cmnd for empty layer': {
            def: ['notempty',['layer','somelayer']],
            scope: { LAYERS: {somelayer: {}} },
            expected: false
        },
        'the notempty cmnd for nonexisting layer': {
            def: ['notempty',['layer','somelayer']],
            scope: { LAYERS: {} },
            expected: false
        },
        'the overlaps cmnd when given two overlapping layers': {
            def: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { LAYERS: {l1: {a:[]}, l2: {a:[]}}},
            expected: true
        },
        'the overlaps cmnd when given two non-overlapping layers': {
            def: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { LAYERS: {l1: {a:[]}, l2: {b:[]}}},
            expected: false
        },
        'the overlaps cmnd when given unexisting layers': {
            def: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { LAYERS: {} },
            expected: false
        },
        'the anyat cmnd when pointing to layer with that pos': {
            def: ['anyat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{a1:[]}}},
            expected: true
        },
        'the anyat cmnd when pointing to layer without pos': {
            def: ['anyat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{}}},
            expected: false
        },
        'the anyat cmnd when pointing to nonexisting layer': {
            def: ['anyat','mylayer',['pos','a1']],
            scope: {LAYERS:{}},
            expected: false
        },
        'the noneat cmnd when pointing to layer with that pos': {
            def: ['noneat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{a1:[]}}},
            expected: false
        },
        'the noneat cmnd when pointing to layer without pos': {
            def: ['noneat','mylayer',['pos','a1']],
            scope: {LAYERS:{mylayer:{}}},
            expected: true
        },
        'the noneat cmnd when pointing to nonexisting layer': {
            def: ['noneat','mylayer',['pos','a1']],
            scope: {LAYERS:{}},
            expected: true
        },
        'the same cmnd when same': {
            def: ['same',4,['value',4]],
            expected: true
        },
        'the same cmnd when different': {
            def: ['same',4,['value',3]],
            expected: false
        },
        'the different cmnd when same': {
            def: ['different',4,['value',4]],
            expected: false
        },
        'the different cmnd when different': {
            def: ['different',4,['value',3]],
            expected: true
        }
    },
    position: {
        'the mark cmnd': {
            def: ['mark','mymark'],
            scope: {
                MARKS: {mymark:'somepos'}
            },
            expected: 'somepos'
        }
    },
    value: {
        'passing primitive': {
            def: 123,
            expected: 123
        },
        'passing string': {
            def: '123',
            expected: '123'
        },
        'the value cmnd': {
            def: ['value','foo'],
            expected: 'foo'
        },
        'the otherplayer when player is 1': {
            def: ['otherplayer'],
            options: {player:1},
            expected: 2
        },
        'the otherplayer when player is 2': {
            def: ['otherplayer'],
            options: {player:2},
            expected: 1
        },
        'the sum cmnd also using currentplayer': {
            def: ['sum',3,['value',2],['currentplayer']],
            options: {player:2},
            expected: 7
        },
        'the ctxval cmnd': {
            def: ['ctxval',['value','someval']],
            scope: {
                CONTEXT: {someval:'foo'}
            },
            expected: 'foo'
        },
        'the playercase cmnd when plr1': {
            def: ['playercase','foo','bar'],
            options: {player:1},
            expected: 'foo'
        },
        'the playercase cmnd when plr2': {
            def: ['playercase','foo','bar'],
            options: {player:2},
            expected: 'bar'
        },
    },
    set: {
        'when given name of layer': {
            def: 'mylayer',
            scope: { LAYERS: {mylayer:{a:1,b:2}} },
            expected: {a:1,b:2}
        },
        'the single cmnd': {
            def: ['single',['mark','mymark']],
            scope: {
                MARKS: {mymark:'somepos'}
            },
            expected: {somepos:1}
        },
        'the layer cmnd': {
            def: ['layer',['value','mylayer']],
            scope: {
                LAYERS: {mylayer:{a:1,b:2}}
            },
            expected: {a:1,b:2}
        },
        'the intersect cmnd': {
            def: ['intersect',['layer','layer1'],['layer','layer2']],
            scope: {
                LAYERS: {
                    layer1: {a:1,b:2},
                    layer2: {b:20,c:30}
                }
            },
            expected: {b:2}
        },
        'the intersect cmnd with many args': {
            def: ['intersect',['layer','layer1'],['layer','layer2'],['layer','layer3']],
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
            def: ['subtract',['layer','layer1'],['layer','layer2'],['layer','layer3']],
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
            def: ['union',['layer','layer1'],['layer','layer2'],['layer','layer3']],
            scope: {
                LAYERS: {
                    layer1: {a:1},
                    layer2: {a:10,b:20},
                    layer3: {c:300}
                }
            },
            expected: {a:1,b:1,c:1}
        }
    }
});