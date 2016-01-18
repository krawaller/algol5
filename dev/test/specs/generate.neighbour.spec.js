import test from '../tester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the neighbour funcs',()=>{
    test(G.drawneighbourtargets, 'the drawneighbourtargets func', {
        'when we want to draw': {
            arg: {draw:{neighbours:{tolayer:'somelayer',include:{found:['neighbourcount']}}}},
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                NEIGHBOURS: ['foo','bar'],
                NEIGHBOURCOUNT: 3,
                LAYERS: {somelayer:{}}
            },
            mutations: {
                LAYERS: {somelayer:{foo:[{found:3}],bar:[{found:3}]}}
            }
        },
        'when we dont care': {
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                NEIGHBOURS: ['foo','bar'],
                NEIGHBOURCOUNT: 3,
                LAYERS: {somelayer:{}}
            },
            mutations: {
                LAYERS: {somelayer:{}}
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
                LAYERS: {somelayer:{}}
            },
            mutations: {
                LAYERS: {somelayer:{start:[{found:3}]}}
            }
        },
        'when we dont care': {
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                NEIGHBOURCOUNT: 3,
                LAYERS: {somelayer:{}}
            },
            mutations: {
                LAYERS: {somelayer:{}}
            }
        }
    });
    test(G.afterneighbourlook, 'the afterneighbourlook func', {
        'for vanilla look': {
            scope: {
                NEIGHBOURS: ['foo','bar']
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
                CONNECTIONS: {s0:{2:'s1'}},
                NEIGHBOURS: ['foo']
            },
            mutations: { NEIGHBOURS: ['foo','s1'], POS: 's1' }
        },
        'with condition which evaluates to true': {
            arg: {condition:['anyat','mylayer',['target']]},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                CONNECTIONS: {s0:{2:'somepos'}},
                LAYERS: {mylayer:{somepos:'yep'}},
                NEIGHBOURS: []
            },
            mutations: { NEIGHBOURS: ['somepos'] }
        },
        'with condition which evaluates to false': {
            arg: {condition:['anyat','mylayer',['target']]},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                CONNECTIONS: {s0:{2:'somepos'}},
                LAYERS: {mylayer:{}},
                NEIGHBOURS: []
            },
            mutations: { NEIGHBOURS: [] }
        }
    });
});