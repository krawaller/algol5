import test from '../gentester'
import lib from '../../../src/codegen/'

let E = lib.E

describe("The effect commands",()=>{
    test(E.killin,'the killin func',{
        'for normal call': {
            arg: ['layer','somelayer'],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: { all: {x1:{id:'unit1'},x3:{id:'unit3'}} },
                UNITDATA: { unit1: {}, unit2: {}, unit3: {} }
            },
            mutations: {
                UNITDATA: { unit2: {} }
            }
        }
    });
    test(E.setin,'the setin func',{
        'for normal call': {
            args: [ ['layer','somelayer'], 'prop', ['sum',['loopid'],['target']] ],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: { all: {x1:{id:'unit1'},x3:{id:'unit3'}} },
                UNITDATA: { unit1: {}, unit2: {}, unit3: {} }
            },
            mutations: {
                UNITDATA: { unit1: {prop:'unit1x1'}, unit2: {}, unit3: {prop:'unit3x3'} }
            },
            norefs: ['UNITDATA.unit1','UNITDATA.unit3']
        }
    });
    test(E.forposin,'the forposin func',{
        'for normal call': {
            args: [ ['layer','somelayer'], ['killat',['target']] ],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: {
                    all: {x1:{id:'unit1'},x3:{id:'unit3'}}
                },
                UNITDATA: {
                    unit1: {}, unit2: {}, unit3: {}
                }
            },
            mutations: {
                UNITDATA: {
                    unit2: {}
                }
            }
        }
    });
    test(E.foridin,'the foridin func',{
        'with non-unit area': {
            args: [ ['layer','somelayer'], ['killid',['loopid']] ],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: {
                    all: {x1:{id:'unit1'},x3:{id:'unit3'}}
                },
                UNITDATA: {
                    unit1: {}, unit2: {}, unit3: {}
                }
            },
            mutations: {
                UNITDATA: {
                    unit2: {}
                }
            }
        },
        'with unit area': {
            showcode: true,
            options: {
                layermappings: { 'myclowns': 'UNITLAYERS' }
            },
            args: [ ['layer','myclowns'], ['killid',['loopid']] ],
            scope: {
                UNITLAYERS: {
                    myclowns: {x1:{id:'unit1'},x3:{id:'unit3'}}
                },
                UNITDATA: {
                    unit1: {}, unit2: {}, unit3: {}
                }
            },
            mutations: {
                UNITDATA: {
                    unit2: {}
                }
            }
        },
    });
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
    });
    test(E.killid,'the killid func',{
        'for straight call': {
            args: ['unit4'],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { someoneelse: 'FOO' } }
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
            mutations: { UNITDATA: {} },
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
                UNITDATA: { 'u42': {foo:0}},
                UNITLAYERS: { all: {pos:{id:'u42'}} },
                MARKS: {at:'pos'}
            },
            mutations: { UNITDATA: { 'u42':{foo:5} } },
            norefs: ['UNITDATA.u42']
        }
    });
    test(E.spawn,'the spawn func',{
        'for just pos and group': {
            args: [['mark','mymark'],'fools'],
            scope: { UNITDATA: {unit1:{}}, MARKS: {mymark:'somepos'}, nextunitid: 7, player: 666 },
            mutations: { UNITDATA: {unit1:{}, unit7:{id:'unit7',group:'fools',owner:666,pos:'somepos'}}, nextunitid: 8 }
        },
        'for pos, group, owner and prop obj': {
            args: [['mark','mymark'],['value','fools'],['value',7],{foo:['value','bar'],baz:['value','bin']}],
            scope: {UNITDATA: {unit1:{}}, MARKS: {mymark:'somepos'}, nextunitid: 5},
            mutations: {
                UNITDATA: {
                    unit1:{},
                    unit5:{id:'unit5',group:'fools',owner:7,pos:'somepos',foo:'bar',baz:'bin'}},
                nextunitid: 6
            },
        }
    });
    test(E.stompid,'the stompid func',{
        'when there is a target': {
            args: [42,['mark','mymark']],
            scope: {
                UNITDATA: { 42: {pos:'somepos'}, doomed: {}},
                UNITLAYERS: { all: {otherpos: {id: 'doomed'}} },
                MARKS: {mymark:'otherpos'}
            },
            mutations: { UNITDATA: { 42: {pos:'otherpos'} } }
        }
    });
    test(E.stompat,'the stompat func',{
        'when there is a target': {
            args: [['mark','from'],['mark','to']],
            scope: {
                UNITDATA: { 42: {pos:'origin'}, doomed: {pos:'destination'}},
                UNITLAYERS: { all: {origin:{id:42},destination:{id:'doomed'}} },
                MARKS: {from:'origin',to:'destination'}
            },
            mutations: { UNITDATA: { 42: {pos:'destination'}} }
        },
        'when there is a target but no one to stomp': {
            args: [['mark','from'],['mark','to']],
            scope: {
                UNITDATA: { notdoomed: {pos:'destination'}},
                UNITLAYERS: { all: {destination:{id:'notdoomed'}} },
                MARKS: {from:'origin',to:'destination'}
            },
            mutations: { UNITDATA: { notdoomed: {pos:'destination'}} }
        }
    });
});
