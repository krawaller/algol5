import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow commands",()=>{
    test(F,'saveMarkStep',{
        'when no AI flag': {
            scope: {
                markpos: 'somepos',
                step: {
                    ARTIFACTS: 'overwriteme',
                    MARKS: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                    path: ['foo'],
                    removemarks: { otherpos: 'otherid' }
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                turn: {steps: {otherstep:'FOO'}}
            },
            mutations: {
                turn: {steps: {
                    otherstep: 'FOO',
                    'oldid-somepos': {
                        ARTIFACTS: 'newartifacts',
                        MARKS: 'newmarks',
                        stepid: 'oldid-somepos',
                        path: ['foo','somepos'],
                        otherstuff: 'saveme',
                        removemarks: { otherpos: 'otherid', somepos: 'oldid' }
                    }
                }}
            },
            additionally: {
                'step was copied': 'step !== turn.steps["oldid-somepos"]',
                'removemarks was copied': 'step.removemarks !== turn.steps["oldid-somepos"].removemarks'
            }
        }
    })
    test(F,'saveCommandStep',{
        'when no AI flag': {
            scope: {
                commandname: 'somecmnd',
                step: {
                    ARTIFACTS: 'overwriteme',
                    MARKS: 'overwriteme',
                    UNITDATA: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                    path: ['foo'],
                    removemarks: 'deleteme'
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                turn: {steps: {otherstep:'FOO'}}
            },
            mutations: {
                turn: {steps: {
                    otherstep: 'FOO',
                    'oldid-somecmnd': {
                        ARTIFACTS: 'newartifacts',
                        MARKS: 'newmarks',
                        UNITDATA: 'newunitdata',
                        stepid: 'oldid-somecmnd',
                        path: ['foo','somecmnd'],
                        otherstuff: 'saveme',
                        undo: 'oldid'
                    }
                }}
            },
            additionally: {
                'step was copied': 'step !== turn.steps["oldid-somecmnd"]'
            }
        }
    })
    test(F,'applyEffectInstructions',{
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
    test(F,'applyCommandConsequences',{
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
            context: {
                blankArtifactLayers: ()=> JSON.stringify({foos:{},bars:'YEAH!'})
            },
            scope: {
                UNITDATA: { unit1: {} },
                UNITLAYERS: { all: { somepos: {id:'unit1'} } },
                cmndname: 'flaunt',
                stepid: 'oldid',
                ARTIFACTS: {doomed:{'somepos':{}},foos:{}},
                connections: {start:{1:'a1'}},
                MARKS: {baz:'bin'},
            },
            mutations: {
                UNITDATA: {},
                ARTIFACTS: {foos:{a1:{}},bars:'YEAH!'},
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
                ARTIFACTS: {foos:{},moos:{}},
                connections: {start:{1:'a1'}},
                MARKS: {baz:'bin'},
                path: ['foo','bar'],
                undo: 'DONTOVERWRITEME'
            },
            context: {
                blankArtifactLayers: ()=> JSON.stringify({foos:{}})
            },
            mutations: {
                UNITDATA: {},
                ARTIFACTS: {foos:{a1:{}}},
                MARKS: {},
                undo: 'DONTOVERWRITEME'
            }
        }
    });
    test(F,'applyMarkConsequences',{
        'for regular call': {
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
                MARKS: {othermark:'otherpos'},
                connections: {start:{1:'a1'}},
                ARTIFACTS: {foos:{}}
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                ARTIFACTS: {foos:{a1:{}}}
            }
        }
    })
    test(F,'linkToEndturn',{
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
    test(F,'instruction',{
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
