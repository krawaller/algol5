import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib.F

describe("The flow commands",()=>{
    test(F.endgame,'the endgame func',{
        'when gamedef has no endgame at all': {
            arg: {},
            expected: undefined
        },
        'when no conditions are fulfilled': {
            arg: {
                endgame: {
                    foo: { condition: ['false'] },
                    bar: { condition: ['false'] }
                }
            },
            expected: undefined
        },
        'when a conditions is fulfilled': {
            options: {player:666},
            arg: {
                endgame: {
                    woo: { condition: ['false'] },
                    foo: { condition: ['true'], who: ['currentplayer'] }
                }
            },
            expected: ['foo',666]
        }
    });
});
