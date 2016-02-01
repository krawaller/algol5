import test from '../gentester'
import lib from '../../../src/codegen/'

let E = lib.E

describe("The effect commands",()=>{
    test(E.swap,'the swap func',{
        'for straight swap': {
            args: [['mark','1st'],['mark','2nd']],
            scope: {
                MARKS: {'1st':'a','2nd':'b'},
                UNITLAYERS: {all: {a:{id:'unit1',pos:'a'},b:{id:'unit2',pos:'b'}}},
                UNITDATA: {unit1:{pos:'a'},unit2:{pos:'b'}}
            },
            mutations: {
                UNITDATA: {unit1:{pos:'b'},unit2:{pos:'a'}}
            }
        }
    })
    test(E.killid,'the killid func',{
        'for straight call': {
            args: [42],
            scope: { UNITDATA: { 42:{name:'foo'} } },
            mutations: { UNITDATA: { 42: {name:'foo',dead:true} } }
        }
    });
    test(E.killat,'the kill1at func',{
        'when noone there': {
            arg: ['mark','mymark'],
            scope: { UNITDATA: {}, UNITLAYERS: {all: {}}, 'MARKS': {mymark:'pos'}},
            mutations: { UNITDATA: {} }
        },
        'when someone is there': {
            args: [['mark','mymark']],
            scope: { UNITDATA: {7:{}}, UNITLAYERS: {all: {pos:{id:7}}}, 'MARKS': {mymark:'pos'}},
            mutations: { UNITDATA: {7:{dead:true}} },
        }
    });
    test(E.moveid,'the moveid func',{
        'for straight call': {
            args: [42,['mark','mymark']],
            scope: { UNITDATA: { 42:{pos:'somepos'} }, MARKS: {mymark:'otherpos'} },
            mutations: { UNITDATA: { 42: {pos:'otherpos'} } }
        }
    });
    test(E.moveat,'the moveat func',{
        'for straight call': {
            args: [['mark','from'],['mark','to']],
            scope: {
                UNITDATA: { 42: {pos:'origin'}},
                UNITLAYERS: { all: {origin:{id:42}} },
                MARKS: {from:'origin',to:'destination'}
            },
            mutations: { UNITDATA: { 42: {pos:'destination'}} }
        }
    });
    test(E.setid,'the setid func',{
        'for straight call': {
            args: [42,'foo',['sum',2,3]],
            scope: { UNITDATA: { 42:{foo:0} } },
            mutations: { UNITDATA: { 42:{foo:5} } },
        }
    });
    test(E.setat,'the setat func',{
        'for straight call': {
            args: [['mark','at'],['value','foo'],['sum',2,3]],
            scope: {
                UNITDATA: { 42: {foo:0}},
                UNITLAYERS: { all: {pos:{id:42}} },
                MARKS: {at:'pos'}
            },
            mutations: { UNITDATA: { 42:{foo:5} } },
        }
    });
    test(E.spawn,'the spawn func',{
        'for just pos and group': {
            args: [['mark','mymark'],'fools'],
            options: {player:666},
            scope: { UNITDATA: {unit1:{}}, MARKS: {mymark:'somepos'} },
            mutations: { UNITDATA: {unit1:{}, unit2:{id:'unit2',group:'fools',owner:666,pos:'somepos'}} }
        }
    });
});
