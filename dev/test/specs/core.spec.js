import expressionTester from '../expressiontester'

expressionTester({
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
        'the value cmnd': {
            def: ['value','foo'],
            expected: 'foo'
        },
        'the sum cmnd': {
            def: ['sum',3,['value',2],-8],
            expected: -3
        },
        'the ctxval cmnd': {
            def: ['ctxval',['value','someval']],
            scope: {
                CONTEXT: {someval:'foo'}
            },
            expected: 'foo'
        }
    },
    set: {
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