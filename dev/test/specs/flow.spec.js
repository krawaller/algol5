import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow commands",()=>{
    test(F.calculateUnitLayers,'the calculateUnitLayers func',{
        'for regular calc': {
            scope: {
                UNITDATA: {
                    unit1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'},
                    unit2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'},
                    unit3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                },
                cleanunitslate: {soldiers: {},knights:{},all:{},MYsoldiers:{},NEUsoldiers:{},knights:{},OPPknights:{},MYunits:{},OPPunits:{},NEUunits:{}},
                ownernames: ['NEU','MY','OPP'],
                UNITLAYERS: 'whatever'
            },
            mutations: {
                //cleanunitslate: {soldiers: {},knights:{},all:{},MYsoldiers:{},NEUsoldiers:{},knights:{},OPPknights:{},MYunits:{},OPPunits:{},NEUunits:{}},
                UNITLAYERS: {
                    all: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'},
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'},
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    soldiers: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'},
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'}
                    },
                    MYsoldiers: {
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'}
                    },
                    NEUsoldiers: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'}
                    },
                    knights: {
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    OPPknights: {
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    MYunits: {
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'}
                    },
                    OPPunits: {
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    NEUunits: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'}
                    }
                }
            }
        }
    })
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
                            applyEffect: ['killid',['idat',['onlyin','doomed']]],
                            runGenerator: 'findfoo'
                        }
                    }
                }
            },
            scope: {
                UNITDATA: { unit1: {} },
                UNITLAYERS: { all: { somepos: {id:'unit1'} } },
                cmndname: 'flaunt',
                stepid: 'oldid',
                newid: 'OVERWRITEME',
                ARTIFACTS: {doomed:{'somepos':{}},foos:{}},
                connections: {start:{1:'a1'}},
                path: ['foo','bar'],
                cleanartifactslate: {foos:{},bars:'YEAH!'},
                MARKS: {baz:'bin'},
            },
            mutations: {
                UNITDATA: {},
                newid: 'oldid-flaunt',
                ARTIFACTS: {foos:{a1:{}},bars:'YEAH!'},
                path: ['foo','bar','flaunt'],
                undo: 'oldid',
                MARKS: {}
            }
        },
        'when passing AI flag, with effect and generator': {
            options: {
                AI: true,
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
                ARTIFACTS: {foos:{},moos:{}},
                cleanartifactslate: {foos:{}},
                connections: {start:{1:'a1'}},
                MARKS: {baz:'bin'},
                path: ['foo','bar'],
                undo: 'DONTOVERWRITEME'
            },
            mutations: {
                UNITDATA: {},
                newid: 'oldid-flaunt',
                ARTIFACTS: {foos:{a1:{}}},
                MARKS: {},
                path: ['foo','bar','flaunt'],
                undo: 'DONTOVERWRITEME'
            }
        }
    });
    test(F.applyMarkConsequences,'the applyMarkConsequences func',{
        'when not passing AI flag': {
            options: {
                markname: 'somemark',
                rules: {
                    marks: {
                        somemark: {
                            runGenerator: 'findfoo'
                        }
                    },
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
                    }
                }
            },
            scope: {
                markname: 'somemark',
                markpos: 'somepos',
                stepid: 'oldid',
                MARKS: {othermark:'otherpos'},
                removemarks: {othermark: 'otherid'},
                newid: 'OVERWRITEME',
                path: ['foo','bar'],
                connections: {start:{1:'a1'}},
                ARTIFACTS: {foos:{}}
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                removemarks: {othermark:'otherid','somemark':'oldid'},
                newid: 'oldid-somepos',
                path: ['foo','bar','somepos'],
                ARTIFACTS: {foos:{a1:{}}}
            },
            norefs: ['removemarks']
        },
        'when passing AI flag': {
            options: {AI:true,rules:{marks:{},generators:{}},markname:'somemark'},
            scope: {
                markname: 'somemark',
                markpos: 'somepos',
                stepid: 'oldid',
                MARKS: {othermark:'otherpos'},
                removemarks: 'SAVEME',
                newid: 'OVERWRITEME',
                path: ['foo','bar']
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                removemarks: 'SAVEME',
                newid: 'oldid-somepos',
                path: ['foo','bar','somepos']
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
