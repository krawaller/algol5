import test from '../gentester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the filter funcs',()=>{
    test(G.applyfilter, 'the applyfilter func', {
        'for vanilla filtering': {
            arg: {
                matching: {foo:['is','bar']},
                condition: ['different',['pos',['target']],'p1'],
                layer: 'source',
                tolayer: 'destination'
            },
            scope: {
                LAYERS: {
                    source: {p1:[{foo:'bar'}],p2:[{foo:'bin'},{foo:'bar'}]},
                    destination: {}
                }
            },
            mutations: {
                LAYERS: {
                    source: {p1:[{foo:'bar'}],p2:[{foo:'bin'},{foo:'bar'}]},
                    destination: {p2:[{foo:'bar'}]}
                }
            }
        }
    });
    test(G.tryposition, 'the tryposition func', {
        'when two objs, 1 matches': {
            arg: {
                matching:{foo:['is','bar']},
                tolayer: 'destination'
            },
            scope: {
                SOURCELAYER: 'source',
                POS: 'a1',
                LAYERS: {
                    source:{a1:[{},{foo:'bar'}]},
                    destination: {}
                }
            },
            mutations: {
                LAYERS: {
                    source:{a1:[{},{foo:'bar'}]},
                    destination: {a1:[{foo:'bar'}]}
                }
            }
        }
    });
    test(G.tryobj, 'the tryobj func', {
        'when simple matching and evals to true': {
            arg: {matching:{someprop:['is',['sum',1,1]],otherprop:['isnt',7]}},
            scope: {
                OBJ: {someprop:2},
                POS: 'somepos',
                TARGETLAYER: 'mylayer',
                LAYERS: {mylayer:{}}
            },
            mutations: {LAYERS:{mylayer:{somepos:[{someprop:2}]}}}
        },
        'when simple matching but condition makes it false': {
            arg: {
                matching: {someprop:['is',['sum',1,1]],otherprop:['isnt',7]},
                condition: ['truthy',0]
            },
            scope: {
                OBJ: {someprop:2},
                POS: 'somepos',
                TARGETLAYER: 'mylayer',
                LAYERS: {mylayer:{}}
            },
            mutations: {LAYERS:{mylayer:{}}}
        }
    });
});