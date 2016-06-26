import test from '../gentester'
import lib from '../../../src/codegen/'

let G = lib

describe('the filter funcs',()=>{
    test(G.applyfilter, 'the applyfilter func', {
        'for vanilla filtering': {
            arg: {
                matching: {foo:['is','bar'],baz:['isnt',['sum',1,1]]},
                condition: ['different',['pos',['target']],'p1'],
                layer: 'source',
                tolayer: 'destination'
            },
            scope: {
                ARTIFACTS: {
                    source: {p1:{foo:'bar'},p2:{foo:'bar'},p3:{foo:'bin'},p4:{baz:2}},
                    destination: {}
                }
            },
            mutations: {
                ARTIFACTS: {
                    source: {p1:{foo:'bar'},p2:{foo:'bar'},p3:{foo:'bin'},p4:{baz:2}},
                    destination: {p2:{foo:'bar'}}
                }
            }
        }
    });
});