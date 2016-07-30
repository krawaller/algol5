import test from '../gentester'
import lib from '../../../src/codegen/'

describe("The flow commands",()=>{
    /*test(lib,'applyLink',{
        'when linking to a command, can end turn': {
            arg: 'somecmnd',
            options: {
                rules: {
                    commands: {
                        somecmnd: 'CMNDDEF'
                    }
                }
            },
            scope: {

            }
        }
    })*/
    test(lib,'linkToEndturn',{
        'when losing, evaluated who': {
            options: {
                player: 1,
                rules: {
                    endgame: {
                        gnarf: {condition:['true'], who:['ifelse',['true'],2,1]}
                    }
                }
            },
            scope: {
                newstepid: 'NEW',
                turn: { links: { NEW: {} } },
            },
            mutations: {
                turn: { links: { NEW: {lose:'gnarf'} } }
            }
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
            scope: {
                newstepid: 'NEW',
                turn: { links: { NEW: {} } },
            },
            mutations: {
                turn: { links: { NEW: {win:'gnarf'} } }
            }
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
                newstepid: 'NEW',
                turn: { links: { NEW: {} } },
            },
            mutations: {
                turn: { links: { NEW: {draw:'wee'} } }
            }
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
            scope: {
                newstepid: 'NEW',
                turn: { links: { NEW: {} } },
            },
            mutations: {
                turn: { links: { NEW: {endturn:'maybe'} } }
            }
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
            scope: {
                newstepid: 'NEW',
                turn: { links: { NEW: {} } },
            },
            mutations: {
                turn: { links: { NEW: {} }, blockedby: 'silly' }
            }
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
                newstepid: 'NEW',
                turn: { links: { NEW: {} } },
            },
            mutations: {
                turn: { links: { NEW: {endturn:'maybe'} } },
                ARTIFACTS: {
                    borks: {a1: {foo:'bar'}},
                    blurbs: {a1: {foo:'bar'}}
                }
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
                newstepid: 'NEW',
                turn: { links: { NEW: {} } },
            },
            mutations: {
                turn: { links: { NEW: {} }, blockedby: 'blurbs' }
            }
        }
    })
});
