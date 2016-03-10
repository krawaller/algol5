import test from '../gentester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the generate funcs',()=>{
    test(G.applyGenerator,'the applyGenerator func',{
        'with simple neighbour def': {
            arg: {
                type: 'neighbour',
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
        'for simple walk': {
            arg: {
                type: 'walker',
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
        'for vanilla filtering': {
            arg: {
                type: 'filter',
                matching: {foo:['is','bar']},
                condition: ['different',['pos',['target']],'p1'],
                layer: 'source',
                tolayer: 'destination'
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
        }
    })
    test(G.addtolayer,'the addtolayer func',{
        'when nothing at that pos': {
            args: ['"mylayer"','"a1"','"foo"'],
            scope: {ARTIFACTS:{mylayer:{}}},
            mutations: {ARTIFACTS:{mylayer:{a1:"foo"}}}
        },
        'when stuff already there': {
            args: ['"mylayer"','"a1"','"foo"'],
            scope: {ARTIFACTS:{mylayer:{a1:"bar"}}},
            mutations: {ARTIFACTS:{mylayer:{a1:"foo"}}}
        }
    })
    test(G.performdraw,'the performdraw func',{
        'with no owner or condition and nothing at the pos': {
            arg: {tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,ARTIFACTS:{somelayer:{}}},
            mutations: {ARTIFACTS:{somelayer:{x:{heading:1}}}}
        },
        'with no owner or condition and previous at the pos': {
            arg: {tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,ARTIFACTS:{somelayer:{x:'foo'}}},
            mutations: {ARTIFACTS:{somelayer:{x:{heading:1}}}}
        },
        'with condition which evaluates to false': {
            arg: {condition:['truthy',0],tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,ARTIFACTS:{somelayer:{}}},
            mutations: {ARTIFACTS:{somelayer:{}}}
        },
        'with condition which evaluates to true': {
            arg: {condition:['truthy',1],tolayer:'somelayer',include:{heading:['dir']}},
            scope: {POS:'x',DIR:1,ARTIFACTS:{somelayer:{}}},
            mutations: {ARTIFACTS:{somelayer:{x:{heading:1}}}}
        },
        'with owner which is opp': {
            options: {player:1},
            arg: {tolayer:'muppets',include:{owner:2}},
            scope: {POS:'x',ARTIFACTS:{muppets:{},oppmuppets:{}}},
            mutations: {ARTIFACTS:{muppets:{x:{owner:2}},oppmuppets:{x:{owner:2}}}}
        },
        'with owner which is my': {
            options: {player:2},
            arg: {tolayer:'muppets',include:{owner:2}},
            scope: {POS:'x',ARTIFACTS:{muppets:{},mymuppets:{}}},
            mutations: {ARTIFACTS:{muppets:{x:{owner:2}},mymuppets:{x:{owner:2}}}}
        },
        'with owner which is neutral': {
            options: {player:1},
            arg: {tolayer:'muppets',include:{owner:['dir']}},
            scope: {DIR:0,POS:'x',ARTIFACTS:{muppets:{},neutralmuppets:{}}},
            mutations: {ARTIFACTS:{muppets:{x:{owner:0}},neutralmuppets:{x:{owner:0}}}}
        }
    });
    test(G.artifactliteral,'the artifactliteral func',{
        'when no includes': {
            arg: {what:'ever'},
            expected: {}
        },
        'when we have an include': {
            arg: {include:{heading:['dir'],limit:['max']}},
            scope: {DIR:1,MAX:5},
            expected: {heading:1,limit:5}
        }
    });
    test(G.stopreason,'the stopreason func', {
        'when def has max and we have reached it': {
            arg: {max:3},
            scope: {LENGTH:3,MAX:3},
            expected: 'reachedmax'
        },
        'when out of bounds': {
            scope: {connections:{pos:{}},DIR:'x',POS:'pos',nextpos:''},
            expected: 'outofbounds'
        },
        'when hit a block': {
            arg: {blocks:"yes"},
            scope: {connections:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',nextpos:'',BLOCKS:{newpos:1}},
            expected: 'hitblock',
            mutations: {nextpos:'newpos'}
        },
        'when out of steps': {
            arg: {steps:"yes"},
            scope: {connections:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',nextpos:'',allowedsteps:{}},
            expected: 'nomoresteps',
            mutations: {nextpos:'newpos'}
        },
        'when navigates blocks and has steps and not reaching max': {
            arg: {steps:"yes",blocks:"indeed",max:"yup"},
            scope: {LENGTH:2,MAX:3,connections:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',nextpos:'',allowedsteps:{'newpos':1},BLOCKS:{}},
            expected: null,
            mutations: {nextpos:'newpos'}
        },
        'when there is connection and def doesnt use blocks or steps or max': {
            scope: {connections:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',nextpos:''},
            expected: null,
            mutations: {nextpos:'newpos'}
        },
        'when steps run out and there is a block in the way': {
            arg: {blocks:"yes",steps:"indeed"},
            scope: {connections:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',nextpos:'',BLOCKS:{newpos:1},allowedsteps:{}},
            expected: 'nomoresteps',
            mutations: {nextpos:'newpos'}
        },
        'when steps run out and there is a block in the way and we prio blocks': {
            arg: {blocks:"yes",steps:"indeed",testblocksbeforesteps:true},
            scope: {connections:{pos:{'x':'newpos'}},DIR:'x',POS:'pos',nextpos:'',BLOCKS:{newpos:1},allowedsteps:{}},
            expected: 'hitblock',
            mutations: {nextpos:'newpos'}
        },
        'when we are floating and we have already floated over that square': {
            arg: {type:'floater'},
            scope: {
                connections: {pos:{1:'sqr'}},
                REACHED: {sqr:true},
                DIR: 1,
                POS: 'pos',
                nextpos: 'whatev'
            },
            expected: 'alreadyreached'
        }
    });
});