import test from '../gentester'
import lib from '../../../src/codegen/'

describe("The flow instruction commands",()=>{
    test(lib,'applyLinkInstructions',{
        'when linking to many': {
            arg: {links:'MYLINKS'},
            options: {foo:'bar'},
            context: {
                instruction: (O,def)=> `var test = "${def.join("_")+O.foo+O.linking}"; `
            },
            mutations: {
                test: 'all_MYLINKSbartrue'
            }
        },
        'when linking to one': {
            arg: {link:'MYLINK'},
            options: {foo:'bar'},
            context: {
                instruction: (O,def)=> `var test = "${def+O.foo+O.linking}"; `
            },
            mutations: {
                test: 'MYLINKbartrue'
            }
        },
        'when no link': {
            arg: {},
            context: { instruction: ()=> {throw "Dont call me!"} },
            scope: { foo: "bar" },
            mutations: { foo: "bar" }
        }
    })
    test(lib,'applyEffectInstructions',{
        'when many effects': {
            arg: {applyEffects:'MYEFFECTS'},
            options: {foo:'bar'},
            context: {
                instruction: (O,def)=> `var test = "${def.join("_")+O.foo+O.effect}"; `
            },
            mutations: {
                test: 'all_MYEFFECTSbartrue'
            }
        },
        'when single effect': {
            arg: {applyEffect:'MYEFFECT'},
            options: {foo:'bar'},
            context: {
                instruction: (O,def)=> `var test = "${def+O.foo+O.effect}"; `
            },
            mutations: {
                test: 'MYEFFECTbartrue'
            }
        },
        'when no effect': {
            arg: {},
            context: { instruction: ()=> {throw "Dont call me!"} },
            scope: { foo: "bar" },
            mutations: { foo: "bar" }
        }
    })
    test(lib,'applyGeneratorInstructions',{
        'when many generators': {
            arg: {runGenerators:'MYGENERATORS'},
            options: {foo:'bar'},
            context: {
                instruction: (O,def)=> `var test = "${def.join("_")+O.foo+O.generating}"; `
            },
            mutations: {
                test: 'all_MYGENERATORSbartrue'
            }
        },
        'when single generator': {
            arg: {runGenerator:'MYGENERATOR'},
            options: {foo:'bar'},
            context: {
                instruction: (O,def)=> `var test = "${def+O.foo+O.generating}"; `
            },
            mutations: {
                test: 'MYGENERATORbartrue'
            }
        },
        'when no generators': {
            arg: {},
            context: { instruction: ()=> {throw "Dont call me!"} },
            scope: { foo: "bar" },
            mutations: { foo: "bar" }
        }
    })
    test(lib,'instruction',{
        'when linking': {
            arg: 'MYLINK',
            options: {
                linking: true,
            },
            context: {
                applyLink: (O,def)=> `var test = "${def}"; `
            },
            mutations: {
                test: 'MYLINK'
            }
        },
        'when generating': {
            arg: 'myfilter',
            options: {
                generating: true,
                rules: {
                    generators: {
                        myfilter: {
                            type: 'filter',
                            matching: {foo:['is','bar']},
                            condition: ['different',['pos',['target']],'p1'],
                            layer: 'source',
                            tolayer: 'destination'
                        }
                    }
                }
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
        },
        'when iftruing an effect': {
            options: {effect: true},
            arg: ['if',['true'],['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { someoneelse: 'FOO' } }
        },
        'when iffalsing an effect': {
            options: {effect: true},
            arg: ['if',['false'],['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } }
        },
        'when ifplayer an effect which is correct': {
            options: {effect: true, player: 1},
            arg: ['ifplayer',1,['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { someoneelse: 'FOO' } }
        },
        'when ifplayer an effect which is not correct': {
            options: {effect: true, player: 1},
            arg: ['ifplayer',2,['killid','unit4']],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } }
        }
    });
});
