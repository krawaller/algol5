import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib.F

describe("The flow commands",()=>{
    test(F.applyEffectInstructions,'the applyEffectInstructions func',{
        'for single effect with no conds': {
            showcode: false, //true,
            scope: {
                UNITDATA: { unit1: {} }
            },
            arg: {
                applyEffect: ['killid',['value','unit1']]
            },
            mutations: {
                UNITDATA: {}
            },
            norefs: ['UNITDATA']
        }
    })
    test(F.applyCommandConsequences,'the applyCommandConsequences func',{
        'when not passing AI flag, with effect and generator': {
            options: {
                cmndname: 'flaunt',
                rules: {
                    generators: {
                        findfoo: {
                            type: 'neighbour',
                            start: ['pos','start'],
                            dir: 1,
                            draw: {
                                neighbours: {
                                    tolayer: 'foos'
                                }
                            }
                        }
                    },
                    commands: {
                        flaunt: {
                            applyEffect: ['killid',['value','unit1']],
                            runGenerator: 'findfoo'
                        }
                    }
                }
            },
            scope: {
                UNITDATA: { unit1: {} },
                cmndname: 'flaunt',
                stepid: 'oldid',
                newid: 'OVERWRITEME',
                ARTIFACTS: {foos:{}},
                connections: {start:{1:'a1'}}
            },
            mutations: {
                UNITDATA: {},
                newid: 'oldid-flaunt',
                ARTIFACTS: {foos:{a1:{}}}
            }
        }
    });
    test(F.applyMarkConsequences,'the applyMarkConsequences func',{
        'when not passing AI flag': {
            scope: {
                markname: 'somemark',
                markpos: 'somepos',
                stepid: 'oldid',
                MARKS: {othermark:'otherpos'},
                removemarks: {othermark: 'otherid'},
                newid: 'OVERWRITEME'
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                removemarks: {othermark:'otherid','somemark':'oldid'},
                newid: 'oldid-somepos'
            },
            norefs: ['removemarks']
        },
        'when passing AI flag': {
            options: {AI:true},
            scope: {
                markname: 'somemark',
                markpos: 'somepos',
                stepid: 'oldid',
                MARKS: {othermark:'otherpos'},
                removemarks: 'SAVEME',
                newid: 'OVERWRITEME'
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                removemarks: 'SAVEME',
                newid: 'oldid-somepos'
            }
        }
    })
    test(F.linkToEndturn,'the linkToEndturn func',{
        'when losing, evaluated who': {
            options: {
                player: 1,
                rules: {
                    endgame: {
                        gnarf: {condition:['true'], who:['ifelse',['true'],2,1]}
                    }
                }
            },
            scope: {links:{}},
            mutations: {links:{endturn:'lose',gameendby:'gnarf'}}
        },
        'when winning, no who': {
            options: {
                player: 1,
                rules: {
                    endgame: {
                        gnarf: {condition:['true']}
                    }
                }
            },
            scope: {links:{}},
            mutations: {links:{endturn:'win',gameendby:'gnarf'}}
        },
        'when draw, depending on gen': {
            options: {
                player: 1,
                rules: {
                    endturn: {
                        runGenerator: 'findblurbs',
                    },
                    endgame: {
                        wee: {condition:['true'],who:['ifelse',['notempty','blurbs'],0,1]}
                    },
                    generators: {
                        'findblurbs': {
                            type: 'filter',
                            layer: 'borks',
                            tolayer: 'blurbs',
                            matching: {foo:['is','bar']}
                        }
                    }
                }
            },
            scope: {
                ARTIFACTS: {
                    borks: {a1: {foo:'bar'}},
                    blurbs: {}
                },
                links: {}
            },
            mutations: {links:{endturn:'draw',gameendby:'wee'}}
        },
        'when linking to endturn and falsy unless': {
            options: {
                rules: {
                    endturn: {
                        unless: {
                            stupid: ['false']
                        }
                    }
                }
            },
            scope: {links:{}},
            mutations: {links:{endturn:'next'}}
        },
        'when linking to endturn and truthy unless': {
            arg: ['endturn'],
            options: {
                rules: {
                    endturn: {
                        unless: {
                            stupid: ['false'],
                            silly: ['true']
                        }
                    }
                }
            },
            scope: {blockedby: "NOTHING"},
            mutations: {blockedby:'silly'}
        },
        'when linking to endturn truthilly depending on single gen': {
            options: {
                rules: {
                    endturn: {
                        runGenerator: 'findblurbs',
                        unless: {
                            noblurbs: ['isempty','blurbs']
                        }
                    },
                    generators: {
                        'findblurbs': {
                            type: 'filter',
                            layer: 'borks',
                            tolayer: 'blurbs',
                            matching: {foo:['is','bar']}
                        }
                    }
                }
            },
            scope: {
                ARTIFACTS: {
                    borks: {a1: {foo:'bar'}},
                    blurbs: {}
                },
                links: {}
            },
            mutations: {
                ARTIFACTS: {
                    borks: {a1: {foo:'bar'}},
                    blurbs: {a1: {foo:'bar'}}
                },
                links: {endturn:'next'}
            }
        },
        'when linking to endturn but unlessed by generator': {
            options: {
                rules: {
                    endturn: {
                        runGenerator: 'findblurbs',
                        unless: {
                            blurbs: ['notempty','blurbs']
                        }
                    },
                    generators: {
                        'findblurbs': {
                            type: 'filter',
                            layer: 'borks',
                            tolayer: 'blurbs',
                            matching: {foo:['is','bar']}
                        }
                    }
                }
            },
            scope: {
                ARTIFACTS: {
                    borks: {a1: {foo:'bar'}},
                    blurbs: {}
                },
                blockedby: "NOTHING"
            },
            mutations: {
                ARTIFACTS: {
                    borks: {a1: {foo:'bar'}},
                    blurbs: {a1: {foo:'bar'}}
                },
                blockedby: 'blurbs'
            }
        }
    })
    test(F.instruction,'the instruction func',{
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
