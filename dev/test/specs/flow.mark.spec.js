import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow mark stuff",()=>{
    test(F,'prepareMarkStep',{
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
                    UNITLAYERS: {my:'unitlayers'}
                },
            },
            mutations: {
                ARTIFACTS: 'artifactsformymark',
                UNITLAYERS: {my:'unitlayers'}
            },
            context: {
                markRules: (O)=> '"mymark"',
                copyArtifactsForAction: (O,def)=> '"artifactsfor"+'+def
            },
            additionally: {
                'dont copy unitlayers': 'UNITLAYERS === step.UNITLAYERS'
            }
        },
        'when uses turnvars': {
            scope: {
                step: {
                    TURNVARS: 'turnvars',
                }
            },
            context: {
                usesTurnVars: (O)=> true
            },
            mutations: {
                TURNVARS: 'turnvars'
            },
            additionally: {
                'turnvars was not copied': 'TURNVARS === step.TURNVARS'
            }
        },
    })
    test(F,'makeMarkStep',{
        'when no generator': {
            options: {
                markname: 'somemark'
            },
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
                stepid: 'newid',
                name: 'somemark'
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
                ARTIFACTS: 'newartifacts',
                name: 'somemark'
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
                turn: {steps: {foo:'bar'},links:{}}
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
                'otherstep wasnt removed': 'turn.steps.foo === "bar"',
                'stepid was added to links': 'turn.links[newstepid]'
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
                applyGeneratorInstructions: (O,def)=> 'ARTIFACTS = "'+def.who+'"; '
            },
            options: {
                markname: 'somemark',
                rules: {
                    marks: {
                        somemark: {
                            who: 'ME',
                            flow: [{name:'othermark',type:'mark'}]
                        }
                    }
                }
            },
            scope: {
                markpos: 'somepos',
                step: {
                    MARKS: {othermark:'otherpos',forgottenmark:'blaj'}
                },
                ARTIFACTS: 'overwriteme'
            },
            mutations: {
                MARKS: {othermark:'otherpos',somemark:'somepos'},
                ARTIFACTS: 'ME'
            },
            additionally: {
                'make sure to copy mark': 'MARKS !== step.MARKS'
            }
        },
        'for cyclic': {
            context: {
                applyGeneratorInstructions: (O,def)=> 'ARTIFACTS = "'+def.who+'"; '
            },
            options: {
                markname: 'somemark',
                rules: {
                    marks: {
                        somemark: {
                            who: 'ME',
                            flow: 'cyclic'
                        }
                    }
                }
            },
            scope: {
                markpos: 'somepos',
                step: {
                    MARKS: {othermark:'otherpos',forgottenmark:'blaj'}
                },
                ARTIFACTS: 'overwriteme'
            },
            mutations: {
                MARKS: {othermark:'otherpos',forgottenmark:'blaj',somemark:'somepos'},
                ARTIFACTS: 'ME'
            },
            additionally: {
                'make sure to copy mark': 'MARKS !== step.MARKS'
            }
        }
    })
});
