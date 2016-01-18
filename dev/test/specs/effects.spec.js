import test from '../tester'
import lib from '../../../src/codegen/'

let E = lib.E

describe("The effect commands",()=>{
    test(E.swap,'the swap func',{
        'for straight swap': {
            args: [['mark','1st'],['mark','2nd']],
            scope: {
                MARKS: {'1st':'a','2nd':'b'},
                LAYERS: {units: {a:[{id:'unit1',pos:'a'},{id:'unit3',pos:'a'}],b:[{id:'unit2',pos:'b'}]}},
                UNITS: {unit1:{pos:'a'},unit2:{pos:'b'},unit3:{pos:'a'}}
            },
            mutations: {
                UNITS: {unit1:{pos:'b'},unit2:{pos:'a'},unit3:{pos:'b'}}
            }
        }
    })
    test(E.killid,'the killid func',{
        'for straight call': {
            args: [42],
            scope: { UNITS: { 42:{name:'foo'} } },
            mutations: { UNITS: { 42: {name:'foo',dead:true} } }
        }
    });
    test(E.kill1at,'the kill1at func',{
        'when noone there': {
            arg: ['mark','mymark'],
            scope: { 'UNITS': {}, LAYERS: {units: {}}, 'MARKS': {mymark:'pos'}},
            mutations: { 'UNITS': {} }
        },
        'when someone is there': {
            args: [['mark','mymark']],
            scope: { 'UNITS': {7:{}}, LAYERS: {units: {pos:[{id:7}]}}, 'MARKS': {mymark:'pos'}},
            mutations: { 'UNITS': {7:{dead:true}} },
        }
    });
    test(E.moveid,'the moveid func',{
        'for straight call': {
            args: [42,['mark','mymark']],
            scope: { UNITS: { 42:{pos:'somepos'} }, MARKS: {mymark:'otherpos'} },
            mutations: { UNITS: { 42: {pos:'otherpos'} } }
        }
    });
    test(E.spawn,'the spawn func',{
        'for just pos and group': {
            args: [['mark','mymark'],'fools'],
            options: {player:666},
            scope: { UNITS: {unit1:{}}, MARKS: {mymark:'somepos'} },
            mutations: { UNITS: {unit1:{}, unit2:{id:'unit2',group:'fools',owner:666,pos:'somepos'}} }
        }
    });
});
