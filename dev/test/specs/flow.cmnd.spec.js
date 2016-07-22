import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow commands",()=>{
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
                path: ['foo','somecmnd']
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
                newunitid: 42
            },
            expected: {
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                stepid: 'newid',
                path: ['foo','somecmnd'],
                newunitid: 42
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
                turn: {steps: {foo:'bar'}}
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
                'otherstep wasnt removed': 'turn.steps.foo === "bar"'
            }
        }
    })
    test(F,'prepareCommandStep',{
        'for simple call with no spawn': {
            scope: {
                step: {
                    UNITDATA: {my:'unitdata'},
                    MARKS: {my:'marks'},
                    ARTIFACTS: {my:'artifacts'},
                    UNITLAYERS: {my:'unitlayers'}
                },
                newunitid: 'dontoverwriteme'
            },
            mutations: {
                UNITDATA: {my:'unitdata'},
                MARKS: {my:'marks'},
                ARTIFACTS: {my:'artifacts'},
                UNITLAYERS: {my:'unitlayers'},
                newunitid: 'dontoverwriteme'
            },
            additionally: {
                'copy unitdata': 'UNITDATA !== step.UNITDATA',
                'dont copy artifacts': 'ARTIFACTS === step.ARTIFACTS',
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
                    newunitid: 2
                },
            },
            mutations: {
                newunitid: 2
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
                calculateUnitLayers: (O)=> 'UNITLAYERS = "new"; ',
                saveCommandStep: (O)=> 'var save = "save"; ',
                applyLinkInstructions: (O)=> 'var links = ARTIFACTS+UNITLAYERS+UNITDATA+save+"link";'
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
                MARKS: {},
                links: 'blank-FLAUNTRULEZnewFLAUNTRULEZsavelink'
            }
        }
    });
});
