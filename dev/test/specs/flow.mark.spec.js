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
        'when no AI flag and no generator': {
            scope: {
                markpos: 'somepos',
                step: {
                    ARTIFACTS: 'dontoverwriteme',
                    MARKS: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                    path: ['foo'],
                    removemarks: { otherpos: 'otherid' }
                },
                ARTIFACTS: 'bogus',
                MARKS: 'newmarks',
                turn: {steps: {otherstep:'FOO'}}
            },
            mutations: {
                turn: {steps: {
                    otherstep: 'FOO',
                    'oldid-somepos': {
                        ARTIFACTS: 'dontoverwriteme',
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
        },
        'when no AI flag and has generator': {
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
                markpos: 'somepos',
                step: {
                    ARTIFACTS: 'overwriteme',
                    MARKS: 'overwriteme',
                    stepid: 'oldid',
                    path: ['foo'],
                    removemarks: { otherpos: 'otherid' }
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                turn: {steps: {otherstep:'FOO'}}
            },
            additionally: {
                'saved artifacts': 'turn.steps["oldid-somepos"].ARTIFACTS === ARTIFACTS'
            }
        }
    })
    test(F,'applyMarkConsequences',{
        'for regular call': {
            context: {
                applyGeneratorInstructions: (O,rules)=> 'ARTIFACTS = "'+rules+'"'
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
                    MARKS: {othermark:'otherpos'}
                },
                ARTIFACTS: 'overwriteme'
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                ARTIFACTS: 'MARKRULE'
            },
            additionally: {
                'make sure to copy mark': 'MARKS !== step.MARKS'
            }
        }
    })
});
