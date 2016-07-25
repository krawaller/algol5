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
    test(F,'makeMarkStep',{
        'when no generator': {
            scope: {
                MARKS: 'newmarks',
                markpos: 'somepos',
                step: {
                    path: ['foo'],
                },
                newstepid: 'newid',
                ARTIFACTS: 'dontincludeme'
            },
            expected: {
                MARKS: 'newmarks',
                path: ['foo','somepos'],
                stepid: 'newid'
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
                MARKS: 'newmarks',
                markpos: 'somepos',
                step: {
                    path: ['foo'],
                },
                newstepid: 'newid',
                ARTIFACTS: 'newartifacts'
            },
            expected: {
                MARKS: 'newmarks',
                path: ['foo','somepos'],
                stepid: 'newid',
                ARTIFACTS: 'newartifacts'
            }
        }
    })
    test(F,'saveMarkStep',{
        'for regular call': {
            scope: {
                markpos: 'somepos',
                step: {
                    stepid: 'oldid',
                    data: 'overwriteme',
                    otherdata: 'keepme'
                },
                turn: {steps: {foo:'bar'}}
            },
            context: {
                makeMarkStep: (O)=> '{data:"newdata",stepid:newstepid}'
            },
            mutations: {
                newstepid: "oldid-somepos",
                newstep: {
                    stepid: 'oldid-somepos',
                    data: 'newdata',
                    otherdata: 'keepme'
                }
            },
            additionally: {
                'step was copied': 'step !== newstep',
                'newstep was saved': 'newstep === turn.steps["oldid-somepos"]',
                'otherstep wasnt removed': 'turn.steps.foo === "bar"'
            }
        }
    })
    test(F,'makeMarkFunction',{
        'for regular mark': {
            options: '"OPTS"',
            context: {
                markFunctionContents: (O)=> 'var newstep = turn+step+markpos; '
            },
            execwith: [1,2,3],
            expected: 6
        }
    })
    test(F,'markFunctionContents',{
        'for regular call': {
            options: '"OPTS"',
            scope: {
                debug: ''
            },
            context: {
                prepareMarkStep: (O)=> `debug +=${O}+"prep"; `,
                applyMarkConsequences: (O)=> `debug +=${O}+"cons"; `,
                saveMarkStep: (O)=> `debug +=${O}+"save"; `,
                applyLinkInstructions: (O)=> `debug +=${O}+"link"; `,
            },
            mutations: {
                debug: 'OPTSprepOPTSconsOPTSsaveOPTSlink'
            }
        }
    })
    test(F,'applyMarkConsequences',{
        'for regular call': {
            context: {
                applyGeneratorInstructions: (O,rules)=> 'ARTIFACTS = "'+rules+'"; '
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
