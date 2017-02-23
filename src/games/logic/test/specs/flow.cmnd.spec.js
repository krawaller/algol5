import test from '../gentester'
import lib from '../'

let F = lib

describe("The flow commands",()=>{
    test(F,'makeCommandFunction',{
        'for regular mark': {
            options: '"OPTS"',
            context: {
                commandFunctionContents: (O)=> 'var newstep = turn+step; '
            },
            execwith: [1,2],
            expected: 3
        }
    })
    test(F,'makeCommandStep',{
        'when no spawn': {
            options: {
                cmndname: 'somecmnd'
            },
            scope: {
                newstepid: 'newid',
                step: {
                    path: ['foo']
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
            },
            expected: {
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                stepid: 'newid',
                path: ['foo','somecmnd'],
                name: 'somecmnd'
            }
        },
        'when cmnd has spawn': {
            options: {
                cmndname: 'somecmnd',
                rules: {
                    commands: {
                        somecmnd: ['wah',{foo:['wee',['spawn']]}]
                    }
                }
            },
            scope: {
                step: {
                    path: ['foo']
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                newstepid: 'newid',
                clones: 42
            },
            expected: {
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                stepid: 'newid',
                path: ['foo','somecmnd'],
                clones: 42,
                name: 'somecmnd'
            }
        }
    })
    test(F,'saveCommandStep',{
        'for regular command': {
            options: {
                cmndname: 'somecmnd'
            },
            scope: {
                step: {
                    somestuff: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                },
                turn: {steps: {foo:'bar'},links:{}}
            },
            context: {
                makeCommandStep: (O)=> `{somestuff:"${O.cmndname}",stepid:newstepid}`
            },
            mutations: {
                newstepid: 'oldid-somecmnd',
                newstep: {
                    somestuff: 'somecmnd',
                    stepid: 'oldid-somecmnd',
                    otherstuff: 'saveme',
                }
            },
            additionally: {
                'step was copied': 'step !== newstep',
                'newstep was saved': 'newstep === turn.steps["oldid-somecmnd"]',
                'otherstep wasnt removed': 'turn.steps.foo === "bar"',
                'stepid was added to links': 'turn.links[newstepid]'
            }
        }
    })
    test(F,'prepareCommandStep',{
        'for simple call with no spawn': {
            scope: {
                step: {
                    UNITDATA: {my:'unitdata'},
                    MARKS: {my:'marks'},
                    UNITLAYERS: {my:'unitlayers'}
                },
                newunitid: 'dontoverwriteme'
            },
            mutations: {
                UNITDATA: {my:'unitdata'},
                MARKS: {my:'marks'},
                ARTIFACTS: 'artifactsformycmnd',
                UNITLAYERS: {my:'unitlayers'},
                newunitid: 'dontoverwriteme'
            },
            context: {
                cmndRules: (O)=> '"mycmnd"',
                copyArtifactsForAction: (O,def)=> '"artifactsfor"+'+def
            },
            additionally: {
                'copy unitdata': 'UNITDATA !== step.UNITDATA',
                'dont copy marks': 'MARKS === step.MARKS',
                'dont copy unitlayers': 'UNITLAYERS === step.UNITLAYERS'
            }
        },
        'when rules have spawn': {
            options: {
                cmndname: 'somecmnd',
                rules: {
                    commands: {
                        somecmnd: ['wah',{foo:['wee',['spawn']]}]
                    }
                }
            },
            scope: {
                step: {
                    clones: 2
                },
            },
            mutations: {
                clones: 2
            }
        },
        'when uses turnvars': {
            options: {
                cmndname: 'somecmnd',
                rules: {
                    commands: {
                        somecmnd: ['wah',{foo:['wee',['spawn']]}]
                    }
                }
            },
            context: {
                usesTurnVars: (O)=> true
            },
            scope: {
                step: {
                    TURNVARS: {foo:'bar'}
                },
            },
            mutations: {
                TURNVARS: {foo: 'bar'}
            },
            additionally: {
                'turnvars was copied': 'TURNVARS !== step.TURNVARS'
            }
        }
    })
    test(F,'commandFunctionContents',{
        'for regular call': {
            options: '"OPTS"',
            scope: {
                debug: ''
            },
            context: {
                prepareCommandStep: (O)=> `debug +=${O}+"prep"; `,
                applyCommandConsequences: (O)=> `debug +=${O}+"cons"; `,
                saveCommandStep: (O)=> `debug +=${O}+"save"; `,
                applyLinkInstructions: (O)=> `debug +=${O}+"link"; `,
            },
            mutations: {
                debug: 'OPTSprepOPTSconsOPTSsaveOPTSlink'
            }
        }
    })
    test(F,'applyCommandConsequences',{
        'for regular call': {
            options: {
                cmndname: 'flaunt',
                rules: {
                    commands: {
                        flaunt: 'FLAUNTRULEZ'
                    }
                }
            },
            context: {
                blankArtifactLayers: ()=> '"blank"',
                applyGeneratorInstructions: (O,cmndrule)=> 'ARTIFACTS += "-" + "'+cmndrule+'"; ',
                applyEffectInstructions: (O,cmndrule)=> 'UNITDATA = "'+cmndrule+'"; ',
                calculateUnitLayers: (O)=> 'UNITLAYERS = "new"; '
            },
            scope: {
                UNITDATA: 'overwriteme',
                cmndname: 'flaunt',
                ARTIFACTS: "overwriteme",
                MARKS: 'overwriteme',
                UNITLAYERS: 'overwriteme'
            },
            mutations: {
                UNITDATA: 'FLAUNTRULEZ',
                ARTIFACTS: 'blank-FLAUNTRULEZ',
                UNITLAYERS: 'new',
                MARKS: {}
            }
        }
    });
});
