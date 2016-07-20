import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow mark stuff",()=>{
    test(F,'prepareMarkStep',{
        'when no generators': {
            scope: {
                step: {
                    ARTIFACTS: {my:'artifacts'},
                    UNITLAYERS: {my:'unitlayers'}
                },
                ARTIFACTS: 'dontoverwriteme',
                UNITLAYERS: 'dontoverwriteme',
            },
            mutations: {
                ARTIFACTS: 'dontoverwriteme',
                UNITLAYERS: 'dontoverwriteme',
            }
        },
        'when has generators': {
            options: {
                markname: 'somemark',
                rules: {
                    marks: {
                        somemark: {
                            runGenerator: 'weee!'
                        }
                    }
                }
            },
            scope: {
                step: {
                    ARTIFACTS: {my:'artifacts'},
                    UNITLAYERS: {my:'unitlayers'}
                },
            },
            mutations: {
                ARTIFACTS: {my:'artifacts'},
                UNITLAYERS: {my:'unitlayers'}
            },
            additionally: {
                'copy artifacts': 'ARTIFACTS !== step.ARTIFACTS',
                'dont copy unitlayers': 'UNITLAYERS === step.UNITLAYERS'
            }
        }
    })
    test(F,'saveMarkStep',{
        'when no generator': {
            scope: {
                markpos: 'somepos',
                step: {
                    ARTIFACTS: 'dontoverwriteme',
                    MARKS: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                    path: ['foo'],
                },
                ARTIFACTS: 'bogus',
                MARKS: 'newmarks',
                newstepid: 'newid'
            },
            mutations: {
                newstep: {
                    ARTIFACTS: 'dontoverwriteme',
                    MARKS: 'newmarks',
                    stepid: 'newid',
                    path: ['foo','somepos'],
                    otherstuff: 'saveme'
                }
            },
            additionally: {
                'step was copied': 'step !== newstep'
            }
        },
        'when has generator': {
            options: {
                markname: 'somemark',
                rules: {
                    marks: {
                        somemark: {
                            runGenerator: 'weee!'
                        }
                    }
                }
            },
            scope: {
                newstepid: 'newid',
                markpos: 'somepos',
                step: {
                    ARTIFACTS: 'overwriteme',
                    MARKS: 'overwriteme',
                    stepid: 'oldid',
                    path: ['foo']
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
            },
            additionally: {
                'saved artifacts': 'newstep.ARTIFACTS === ARTIFACTS'
            }
        }
    })
    test(F,'applyMarkConsequences',{
        'for regular call': {
            context: {
                applyGeneratorInstructions: (O,rules)=> 'ARTIFACTS = "'+rules+'"; ',
                applyLinkInstructions: (O)=> 'var links = ARTIFACTS+save+"link"; ',
                saveMarkStep: (O)=> 'var save = "save"; '
            },
            options: {
                markname: 'somemark',
                rules: {
                    marks: {
                        somemark: 'MARKRULE'
                    }
                }
            },
            scope: {
                markpos: 'somepos',
                step: {
                    MARKS: {othermark:'otherpos'},
                    stepid: 'oldid'
                },
                ARTIFACTS: 'overwriteme'
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                ARTIFACTS: 'MARKRULE',
                links: 'MARKRULEsavelink',
                newstepid: 'oldid-somepos'
            },
            additionally: {
                'make sure to copy mark': 'MARKS !== step.MARKS'
            }
        }
    })
});
