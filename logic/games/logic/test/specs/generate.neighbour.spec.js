import test from '../gentester'
import lib from '../'

let G = lib

describe('the neighbour funcs',()=>{
    test(G,'drawmanyneighbours', {
        'when we want to draw': {
            arg: {draw:{neighbours:{tolayer:'somelayer',include:{found:['neighbourcount'],at:['pos',['target']]}}}},
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                foundneighbours: ['foo','bar'],
                NEIGHBOURCOUNT: 2,
                ARTIFACTS: {somelayer:{}}
            },
            mutations: {
                ARTIFACTS: {somelayer:{foo:{found:2,at:'foo'},bar:{found:2,at:'bar'}}}
            }
        },
        'when we want to draw and include DIR': {
            arg: {draw:{neighbours:{tolayer:'somelayer',include:{from:['dir']}}}},
            scope: {
                POS: 'sthelse',
                STARTPOS: 'start',
                foundneighbours: ['foo','bar'],
                foundneighbourdirs: ['firstdir','seconddir'],
                NEIGHBOURCOUNT: 2,
                ARTIFACTS: {somelayer:{}}
            },
            mutations: {
                ARTIFACTS: {somelayer:{foo:{from:'firstdir'},bar:{from:'seconddir'}}}
            }
        },
        'when we dont care about drawing': {
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
    test(G,'drawneighbourstart', {
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
    test(G,'findneighbourindir', {
        'for vanilla look with no saving (so we draw)': {
            arg: {draw:{neighbours:{tolayer:'somelayer'}}},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                connections: {s0:{2:'s1'}},
                ARTIFACTS: {somelayer:{}}
            },
            mutations: {
                ARTIFACTS: {somelayer:{s1:{}}}
            }
        },
        'for vanilla look with saving': {
            arg: {draw:['neighbourcount']},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                connections: {s0:{2:'s1'}},
                foundneighbours: ['foo']
            },
            mutations: { foundneighbours: ['foo','s1'], POS: 's1' }
        },
        'for vanilla look where we save and care about storing dir': {
            arg: {draw:{neighbours:{include:{from:['dir'],count:['neighbourcount']}}}},
            scope: {
                STARTPOS: 's0',
                DIR: 2,
                connections: {s0:{2:'s1'}},
                foundneighbours: ['foo'],
                foundneighbourdirs: ['wee']
            },
            mutations: { foundneighbours: ['foo','s1'], POS: 's1', foundneighbourdirs: ['wee',2] }
        },
        'for vanilla look with saving and provided dir': {
            args: [{draw:['neighbourcount']},7],
            scope: {
                STARTPOS: 's0',
                connections: {s0:{7:'s1'}},
                foundneighbours: ['foo']
            },
            mutations: { foundneighbours: ['foo','s1'], POS: 's1' }
        },
        'with saving and condition which evaluates to true': {
            arg: {draw:['neighbourcount'],condition:['anyat','mylayer',['target']]},
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
    test(G,'applyneighbours', {
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
        },
        'using ifover and unlessover for neighbours': {
            arg: {
                dirs:[1,2,3],
                start:'mymark',
                ifover: 'required',
                unlessover: 'forbidden',
                draw: {
                    neighbours: { tolayer: 'neighbours'}
                }
            },
            scope: {
                connections: {s0:{1:'s1',2:'s2',3:'s3'}},
                MARKS: {mymark:'s0'},
                ARTIFACTS: {
                    neighbours:{},
                    required:{s1:{},s3:{}},
                    forbidden:{s1:{}}
                }
            },
            mutations: { ARTIFACTS: {
                neighbours:{s3:{}},
                required:{s1:{},s3:{}},
                forbidden:{s1:{}}
            } }
        },
        'with start-dependant dir condition': {
            arg: {
                dir: ['ifelse',['anyat','dorks',['start']],1,2],
                starts: 'blorks',
                draw: {
                    neighbours: {
                        tolayer: 'neighbours',
                        include: {dir:['dir']}
                    },
                }
            },
            scope: {
                connections: {s0:{1:'t0',2:'X'},s1:{1:'X',2:'t1'}},
                ARTIFACTS: {
                    dorks: {s0:{}},
                    blorks: {s0:{},s1:{}},
                    neighbours: {}
                }
            },
            mutations: {
                ARTIFACTS: {
                    dorks: {s0:{}},
                    blorks: {s0:{},s1:{}},
                    neighbours: {t0:{dir:1},t1:{dir:2}}
                }
            }
        },
        'using count from multistart multidir': {
            arg: {
                dirs: [1,2],
                starts: 'from',
                draw: {
                    start: { tolayer: 'starts'},
                    neighbours: { tolayer: 'neighbours', include: {total:['neighbourcount']}}
                }
            },
            scope: {
                connections: {s0:{2:'t0'},s1:{1:'t1',2:'t2'}},
                ARTIFACTS: {
                    from:{s0:{},s1:{}},
                    starts:{},
                    neighbours:{}
                }
            },
            mutations: {
                ARTIFACTS: {
                    from:{s0:{},s1:{}},
                    starts:{s0:{},s1:{}},
                    neighbours:{t0:{total:1},t1:{total:2},t2:{total:2}}}
                }
        },
        'using neighbourcondition from multistart multidir': {
            arg: {
                dirs: [1,2],
                starts: 'from',
                condition: ['noneat',['single','mymark'],['target']],
                draw: {
                    start: { tolayer: 'starts'},
                    neighbours: { tolayer: 'neighbours' }
                }
            },
            scope: {
                connections: {s0:{2:'t0'},s1:{1:'t1',2:'t2'}},
                MARKS: { mymark: 't2'},
                ARTIFACTS: {
                    from:{s0:{},s1:{}},
                    starts:{},
                    neighbours:{}
                }
            },
            mutations: {
                ARTIFACTS: {
                    from:{s0:{},s1:{}},
                    starts:{s0:{},s1:{}},
                    neighbours:{t0:{},t1:{}}
                }
            }
        }
    });
});