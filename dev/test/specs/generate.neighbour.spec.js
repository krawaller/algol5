import test from '../gentester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the neighbour funcs',()=>{
    test(G.drawneighbourtargets, 'the drawneighbourtargets func', {
        'when we want to draw': {
            arg: {draw:{neighbours:{tolayer:'somelayer',include:{found:['neighbourcount']}}}},
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                foundneighbours: ['foo','bar'],
                NEIGHBOURCOUNT: 3,
                ARTIFACTS: {somelayer:{}}
            },
            mutations: {
                ARTIFACTS: {somelayer:{foo:{found:3},bar:{found:3}}}
            }
        },
        'when we dont care': {
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                foundneighbours: ['foo','bar'],
                NEIGHBOURCOUNT: 3,
                ARTIFACTS: {somelayer:{}}
            },
            mutations: {
                ARTIFACTS: {somelayer:{}}
            }
        }
    });
    test(G.drawneighbourstart, 'the drawneighbourstart func', {
        'when we want to draw': {
            arg: {draw:{start:{tolayer:'somelayer',include:{found:['neighbourcount']}}}},
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                NEIGHBOURCOUNT: 3,
                ARTIFACTS: {somelayer:{}}
            },
            mutations: {
                ARTIFACTS: {somelayer:{start:{found:3}}}
            }
        },
        'when we dont care': {
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                NEIGHBOURCOUNT: 3,
                ARTIFACTS: {somelayer:{}}
            },
            mutations: {
                ARTIFACTS: {somelayer:{}}
            }
        }
    });
    test(G.afterneighbourlook, 'the afterneighbourlook func', {
        'for vanilla look when we dont care about count': {
            scope: {
                foundneighbours: ['foo','bar'],
                NEIGHBOURCOUNT: 'dontmutateme'
            },
            mutations: {
                NEIGHBOURCOUNT: 'dontmutateme'
            }
        },
        'when we do care about total count': {
            scope: {
                foundneighbours: ['foo','bar'],
            },
            arg: {
                draw: {
                    all: {
                        include: {
                            outof: ['neighbourcount']
                        }
                    }
                }
            },
            mutations: {
                NEIGHBOURCOUNT: 2
            }
        }
    });
    test(G.findneighbourindir, 'the findneighbourindir func', {
        'for vanilla look': {
            arg: {},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                connections: {s0:{2:'s1'}},
                foundneighbours: ['foo']
            },
            mutations: { foundneighbours: ['foo','s1'], POS: 's1' }
        },
        'with condition which evaluates to true': {
            arg: {condition:['anyat','mylayer',['target']]},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                connections: {s0:{2:'somepos'}},
                ARTIFACTS: {mylayer:{somepos:'yep'}},
                foundneighbours: []
            },
            mutations: { foundneighbours: ['somepos'] }
        },
        'with condition which evaluates to false': {
            arg: {condition:['anyat','mylayer',['target']]},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                connections: {s0:{2:'somepos'}},
                ARTIFACTS: {mylayer:{}},
                foundneighbours: []
            },
            mutations: { foundneighbours: [] }
        }
    });
    test(G.findneighboursfromstart, 'the findneighbourfromstart func', {
        'when single dir in def': {
            arg: {dir:2},
            scope: {
                STARTPOS: 's0',
                connections: {s0:{2:'s1'}},
                foundneighbours: ['foo']
            },
            mutations: { foundneighbours: ['foo','s1'], POS: 's1', DIR: 2 }
        },
        'when dirs in def': {
            arg: {dirs:[1,2]},
            scope: {
                STARTPOS: 's0',
                connections: {s0:{1:'s1',2:'s2'}},
                foundneighbours: ['foo']
            },
            mutations: { foundneighbours: ['foo','s1','s2']}
        }
    });
    test(G.findneighbours, 'the applyneighbours func', {
        'with single start': {
            arg: {dir:2,start:'mymark'},
            scope: {
                connections: {s0:{2:'s1'}},
                MARKS: {mymark:'s0'}
            },
            mutations: { foundneighbours: ['s1'], STARTPOS: 's0' }
        },
        'with 2 starts': {
            arg: {dir:2,starts:'mylayer'},
            scope: {
                connections: {s0:{2:'s1'},p0:{2:'p1'}},
                ARTIFACTS: {mylayer:{s0:'yes',p0:'yes'}}
            },
            mutations: { foundneighbours: ['s1','p1']}
        }
    });
    test(G.applyneighbours, 'the applyneighbours func', {
        'with simple def': {
            arg: {
                dir:2,
                start:'mymark',
                draw: {
                    start: { tolayer: 'starts'},
                    neighbours: { tolayer: 'neighbours'}
                }
            },
            scope: {
                connections: {s0:{2:'s1'}},
                MARKS: {mymark:'s0'},
                ARTIFACTS: {starts:{},neighbours:{}}
            },
            mutations: { ARTIFACTS: {starts:{s0:{}},neighbours:{s1:{}}} }
        }
    });
});