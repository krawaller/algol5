import test from '../gentester'
import lib from '../'

let G = lib

describe('the generate funcs',()=>{
    test(G,'applywalker', {
        'for simple walk': {
            arg: {
                starts: ['layer','starts'],
                dirs: [1,3,5],
                draw: {
                    steps: {
                        tolayer: 'steps',
                        include: {heading: ['dir'],nbr:['step']}
                    }
                }
            },
            scope: {
                connections: {p0:{1:'p1'},p1:{1:'p2'},p2:{},q0:{3:'q1'},q1:{}},
                ARTIFACTS: { steps:{}, starts: {q0:'yes',p0:'yes'} }
            },
            mutations: {
                ARTIFACTS: {
                    starts: {q0:'yes',p0:'yes'},
                    steps:{
                        p1: {heading:1,nbr:1},
                        p2: {heading:1,nbr:2},
                        q1: {heading:3,nbr:1}
                    }
                }
            }
        },
        'when just 1 start': {
            arg: {
                start: ['pos','q0'],
                dirs: [1,3,5],
                draw: {
                    steps: {
                        tolayer: 'steps',
                        include: {heading: ['dir'],nbr:['step']}
                    }
                }
            },
            scope: {
                connections: {q0:{3:'q1'},q1:{}},
                ARTIFACTS: { steps:{} }
            },
            mutations: {
                ARTIFACTS: { steps:{ q1: {heading:3,nbr:1} } }
            }
        }
    });
    test(G,'walkfromstart', {
        'for simple walk': {
            arg: {
                dirs: [1,3],
                draw: {
                    steps: {
                        tolayer: 'steps',
                        include: {heading: ['dir']}
                    }
                }
            },
            scope: {
                STARTPOS: 'p0',
                connections: {p0:{1:'p1',3:'q1'},p1:{1:'p2'},p2:{},q1:{}},
                ARTIFACTS: { steps:{} }
            },
            mutations: {
                ARTIFACTS: {
                    steps:{
                        p1: {heading:1},
                        p2: {heading:1},
                        q1: {heading:3}
                    }
                }
            }
        },
        'when just 1 dir': {
            arg: {
                dir: 1,
                draw: {
                    steps: {
                        tolayer: 'steps',
                        include: {heading: ['dir']}
                    }
                }
            },
            scope: {
                STARTPOS: 'p0',
                connections: {p0:{1:'p1',3:'q1'},p1:{1:'p2'},p2:{},q1:{}},
                ARTIFACTS: { steps:{} }
            },
            mutations: {
                ARTIFACTS: {
                    steps:{
                        p1: {heading:1}, p2: {heading:1}
                    }
                }
            }
        }
    });
    test(G,'walkindir', {
        'for simple walk': {
            arg: {
                blocks: ['layer','intheway'],
                draw: {
                    steps: {tolayer: 'steps'},
                    block: {tolayer: 'blocks'}
                }
            },
            scope: {
                STARTPOS: 'p0',
                DIR: 1,
                BLOCKS: {p3:'yep'},
                connections: {p0:{1:'p1'},p1:{1:'p2'},p2:{1:'p3'},p3:{1:'p4'}},
                ARTIFACTS: {
                    steps:{},
                    blocks:{}
                }
            },
            mutations: {
                ARTIFACTS: {
                    steps:{p1:{},p2:{}},
                    blocks:{p3:{}}
                }
            }
        }
    });
    test(G,'drawwalksteps', {
        'when just draw the steps, NOT caring about stepnbr': {
            arg: {
                draw: { steps: { tolayer: 'steps' }}
            },
            scope: {STEP:'shouldnotbeoverwritten',POS:'sthelse',ARTIFACTS:{steps:{}},walkedsquares:['foo','bar'],WALKLENGTH:2},
            mutations: {STEP:'shouldnotbeoverwritten',ARTIFACTS:{steps:{foo:{},bar:{}}}}
        },
        'when just draw the steps, caring about stepnbr': {
            arg: {
                draw: { steps: { tolayer: 'steps', include: {nbr:['step']} }}
            },
            scope: {POS:'sthelse',ARTIFACTS:{steps:{}},walkedsquares:['foo','bar'],WALKLENGTH:2},
            mutations: {ARTIFACTS:{steps:{foo:{nbr:1},bar:{nbr:2}}}}
        },
        'with some countshit, caring about stepnbr': {
            arg: {
                count: 'yes',
                draw: { counted: { tolayer: 'counted', include: {nbr:['step'],sofar:['countsofar']} }}
            },
            scope: {CURRENTCOUNT:'foo',POS:'sthelse',ARTIFACTS:{counted:{}},walkedsquares:['foo','bar'],WALKLENGTH:2,walkpositionstocount:{bar:'yep'},countedwalkpositions:['x','y']},
            mutations: {ARTIFACTS:{counted:{bar:{nbr:2,sofar:'y'}}}}
        }
    });
    test(G,'drawwalkstart', {
        'when we draw simple start': {
            options: {useforpos:'STARTPOS'},
            arg: {
                draw: { start: { tolayer: 'begins' }}
            },
            scope: {STARTPOS:'start',ARTIFACTS:{begins:{}}},
            mutations: {ARTIFACTS:{begins:{start:{}}}}
        },
        'when we also draw all': {
            options: {useforpos:'STARTPOS'},
            arg: {
                draw: {
                    start: { tolayer: 'begins' },
                    all: { tolayer: 'everything' }
                }
            },
            scope: {STARTPOS:'start',ARTIFACTS:{begins:{},everything:{}}},
            mutations: {ARTIFACTS:{begins:{start:{}},everything:{start:{}}}}
        },
        'when using pos': {
            arg: {
                draw: {
                    start: {
                        tolayer: 'begins',
                        include: {
                            where: ['pos',['target']]
                        }
                    }
                }
            },
            scope: {POS:'sthelse',STARTPOS:'start',ARTIFACTS:{begins:{}}},
            mutations: {POS:'start',ARTIFACTS:{begins:{start:{where:'start'}}}}
        }
    });
    test(G,'drawwalklast', {
        'for vanilla walk': {
            arg: {
                draw: {
                    last: {
                        tolayer: 'lasts',
                        include: {at:['step']}
                    }
                }
            },
            scope: {STEP:7,POS:'wherever',WALKLENGTH:2,walkedsquares:['foo','bar'],ARTIFACTS:{lasts:{}}},
            mutations: {STEP:2,ARTIFACTS:{lasts:{bar:{at:2}}}}
        }
    });
    test(G,'drawwalkblock', {
        'when we hit block and want to draw it': {
            arg: {
                blocks: 'yep',
                draw: {
                    block: {
                        tolayer: 'blocks',
                        include: {why:['stopreason']}
                    }
                }
            },
            scope: {POS:'boom',STOPREASON:'hitblock',ARTIFACTS:{blocks:{}},BLOCKS:{boom:'yes'}},
            mutations: {ARTIFACTS:{blocks:{boom:{why:'hitblock'}}}}
        },
        'when we hit block and also draw all': {
            arg: {
                blocks: 'yep',
                draw: {
                    block: { tolayer: 'blocks' },
                    all: { tolayer: 'everything' }
                }
            },
            scope: {POS:'boom',STOPREASON:'hitblock',ARTIFACTS:{blocks:{},everything:{}},BLOCKS:{boom:'yes'}},
            mutations: {ARTIFACTS:{blocks:{boom:{}},everything:{boom:{}}}}
        }
    });
    test(G,'takewalkstep', {
        'for normal walk when we dont care': {
            context: { needsWalkPath: O=> false },
            scope: {walkedsquares:['foo']},
            mutations: {walkedsquares:['foo']}
        },
        'for normal walk when we DO care': {
            context: { needsWalkPath: O=> true },
            scope: {walkedsquares:['foo'],POS:'bar'},
            mutations: {walkedsquares:['foo','bar']}
        },
        'with count and nextpos not to be counted': {
            arg: {count:'YES',draw:['countsofar']},
            scope: {walkedsquares:['foo'],countedwalkpositions:['whatev'],CURRENTCOUNT:7,walkpositionstocount:{},POS:'bar'},
            mutations: {countedwalkpositions:['whatev',7],CURRENTCOUNT:7}
        },
        'with count and nextpos should be counted': {
            arg: {count:'YES',draw:['countsofar']},
            scope: {walkedsquares:['foo'],POS:'bar',countedwalkpositions:['whatev'],CURRENTCOUNT:7,walkpositionstocount:{bar:'yes'}},
            mutations: {countedwalkpositions:['whatev',8],CURRENTCOUNT:8}
        },
        'with count and nextpos should be counted and we intend to draw': {
            arg: {count:'YES',draw:{counted:'sure',foo:['countsofar']}},
            scope: {COUNTED:['x'],walkedsquares:['foo'],POS:'bar',countedwalkpositions:['whatev'],CURRENTCOUNT:7,walkpositionstocount:{bar:'yes'}},
            mutations: {countedwalkpositions:['whatev',8],CURRENTCOUNT:8}
        }
    });
    test(G,'afterwalk', {
        'for vanilla walk with walklength use': {
            arg: {draw: {steps: true}},
            context: { needsWalkLength: ()=> true },
            scope: {walkedsquares:[1,2,3]},
            mutations: {WALKLENGTH:3}
        },
        'if we count': {
            arg: {count:'yep'},
            scope: {walkedsquares:[1,2,3],CURRENTCOUNT:7},
            mutations: {TOTALCOUNT:7}
        },
        'if we dont need walklength': {
            scope: {walkedsquares:[1,2,3],WALKLENGTH:'dontcalculateme'},
            context: { needsWalkLength: ()=> false },
            mutations: {WALKLENGTH:'dontcalculateme'}
        }
    });
    /*test(G,'prepwalkstart', {
        'for vanilla def': {
            scope: {STARTPOS: 'somepos'},
            mutations: {POS: 'somepos', walkedsquares: [],STOPREASON:'',nextpos:''}
        },
        'when def has max': {
            arg: {max:['value',4]},
            scope: {DIR: 7, STARTPOS: 'somepos'},
            mutations: {MAX: 4}
        },
        'with startasstep': {
            arg: {startasstep:true},
            scope: {connections:{foo:'bar',faux:{baz:'bin'}},STARTPOS:'somepos',DIR:'somedir'},
            mutations: {connections:{foo:'bar',faux:{baz:'bin',somedir:'somepos'}},POS:'faux'}
        },
        'with steps': {
            arg: {steps:['layer','somelayer']},
            scope: {ARTIFACTS:{somelayer:'L'},STARTPOS:'somepos'},
            mutations: {allowedsteps:'L'}
        },
        'with blocks': {
            arg: {blocks:['layer','somelayer']},
            scope: {ARTIFACTS:{somelayer:'L'},STARTPOS:'somepos'},
            mutations: {BLOCKS:'L'}
        },
        'with count': {
            arg: {count:['layer','somelayer']},
            scope: {ARTIFACTS:{somelayer:'L'},STARTPOS:'somepos'},
            mutations: {walkpositionstocount:'L',countedwalkpositions: [], CURRENTCOUNT: 0}
        },
        'with count and intent to draw counted': {
            arg: {count:['layer','somelayer'],draw:{counted:'yes'}},
            scope: {ARTIFACTS:{somelayer:'L'},STARTPOS:'somepos'},
            mutations: {walkpositionstocount:'L',countedwalkpositions: [], CURRENTCOUNT: 0}
        }
    });*/
});