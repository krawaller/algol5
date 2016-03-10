import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib.F

describe("The flow commands",()=>{
    test(F.instruction,'the instruction func',{
        'when generating': {
            arg: 'myfilter',
            options: {
                generators: {
                    myfilter: {
                        type: 'filter',
                        matching: {foo:['is','bar']},
                        condition: ['different',['pos',['target']],'p1'],
                        layer: 'source',
                        tolayer: 'destination'
                    }
                }
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
        },
        'when iftruing an effect': {
            options: {effect: true},
            arg: ['if',['true'],['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { someoneelse: 'FOO' } }
        },
        'when iffalsing an effect': {
            options: {effect: true},
            arg: ['if',['false'],['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } }
        },
        'when ifplayer an effect which is correct': {
            options: {effect: true, player: 1},
            arg: ['ifplayer',1,['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { someoneelse: 'FOO' } }
        },
        'when ifplayer an effect which is not correct': {
            options: {effect: true, player: 1},
            arg: ['ifplayer',2,['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } }
        }
    });
    test(F.endgame,'the endgame func',{
        'when gamedef has no endgame at all': {
            arg: {},
            expected: undefined
        },
        'when no conditions are fulfilled': {
            options: {},
            arg: {
                endgame: {
                    foo: { condition: ['false'] },
                    bar: { condition: ['false'] }
                }
            },
            expected: undefined
        },
        'when a conditions is fulfilled with no specified `who`': {
            options: {player:666},
            arg: {
                endgame: {
                    woo: { condition: ['false'] },
                    foo: { condition: ['true'] }
                }
            },
            expected: ['foo',666]
        },
        'when a conditions is fulfilled with specified player': {
            options: {player:666},
            arg: {
                endgame: {
                    woo: { condition: ['false'] },
                    foo: { condition: ['true'], who: 5 }
                }
            },
            expected: ['foo',5]
        }
    });
    test(F.preventendturn,'the preventendturn func',{
        'when gamedef has no unless at all': {
            arg: {},
            expected: undefined
        },
        'when no conditions are fulfilled': {
            arg: {
                unless: {
                    foo: ['false'],
                    bar: ['false']
                }
            },
            expected: undefined
        },
        'when a conditions is fulfilled': {
            options: {player:666},
            arg: {
                unless: {
                    foo: ['false'],
                    bar: ['true']
                }
            },
            expected: 'bar'
        }
    });
});
