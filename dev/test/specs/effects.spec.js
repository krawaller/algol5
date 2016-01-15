import mutationTester from '../mutationtester'

mutationTester({
    killid: {
        'for straight call': {
            args: [42],
            scope: { UNITS: { 42:{name:'foo'} } },
            mutations: { UNITS: { 42: {name:'foo',dead:true} } }
        }
    },
    kill1at: {
        'when noone there': {
            args: [['mark','mymark']],
            scope: { 'UNITS': {}, LAYERS: {units: {}}, 'MARKS': {mymark:'pos'}},
            mutations: { 'UNITS': {} }
        },
        'when someone is there': {
            args: [['mark','mymark']],
            scope: { 'UNITS': {7:{}}, LAYERS: {units: {pos:[{id:7}]}}, 'MARKS': {mymark:'pos'}},
            mutations: { 'UNITS': {7:{dead:true}} },
        }
    },
    moveid: {
        'for straight call': {
            args: [42,['mark','mymark']],
            scope: { UNITS: { 42:{pos:'somepos'} }, MARKS: {mymark:'otherpos'} },
            mutations: { UNITS: { 42: {pos:'otherpos'} } }
        }
    },
    spawn: {
        'for just pos and group': {
            args: [['mark','mymark'],'fools'],
            options: {player:666},
            scope: { UNITS: {unit1:{}}, MARKS: {mymark:'somepos'} },
            mutations: { UNITS: {unit1:{}, unit2:{id:'unit2',group:'fools',owner:666,pos:'somepos'}} }
        }
    }
});