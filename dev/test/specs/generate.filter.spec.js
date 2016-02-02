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
                ARTIFACTS: {
                    source: {p1:{foo:'bar'},p2:{foo:'bar'},p3:{foo:'bin'}},
                    destination: {}
                }
            },
            mutations: {
                ARTIFACTS: {
                    source: {p1:{foo:'bar'},p2:{foo:'bar'},p3:{foo:'bin'}},
                    destination: {p2:{foo:'bar'}}
                }
            }
        }
    });
    test(G.tryposition, 'the tryposition func', {
        'when object matches': {
            arg: {
                matching:{foo:['is','bar']},
                tolayer: 'destination'
            },
            scope: {
                SOURCELAYER: {a1:{foo:'bar'}},
                POS: 'a1',
                ARTIFACTS: {
                    destination: {}
                }
            },
            mutations: {
                ARTIFACTS: {
                    destination: {a1:{foo:'bar'}}
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
                targetlayername: 'mylayer',
                ARTIFACTS: {mylayer:{}}
            },
            mutations: {ARTIFACTS:{mylayer:{somepos:{someprop:2}}}}
        },
        'when simple matching but condition makes it false': {
            arg: {
                matching: {someprop:['is',['sum',1,1]],otherprop:['isnt',7]},
                condition: ['truthy',0]
            },
            scope: {
                OBJ: {someprop:2},
                POS: 'somepos',
                targetlayername: 'mylayer',
                ARTIFACTS: {mylayer:{}}
            },
            mutations: {ARTIFACTS:{mylayer:{}}}
        }
    });
});