import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow commands",()=>{
    test(F,'saveCommandStep',{
        'when no AI flag': {
            options: {
                cmndname: 'somecmnd'
            },
            scope: {
                step: {
                    ARTIFACTS: 'overwriteme',
                    MARKS: 'overwriteme',
                    UNITDATA: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                    path: ['foo']
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                turn: {steps: {otherstep:'FOO'}},
                newstepid: 'newid'
            },
            mutations: {
                newstep: {
                    ARTIFACTS: 'newartifacts',
                    MARKS: 'newmarks',
                    UNITDATA: 'newunitdata',
                    UNITLAYERS: 'newunitlayers',
                    stepid: 'newid',
                    path: ['foo','somecmnd'],
                    otherstuff: 'saveme',
                }
            },
            additionally: {
                'step was copied': 'step !== newstep'
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
                    ARTIFACTS: 'overwriteme',
                    MARKS: 'overwriteme',
                    UNITDATA: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                    path: ['foo']
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                turn: {steps: {otherstep:'FOO'}},
                newunitid: 42,
                newstepid: 'newid'
            },
            additionally: {
                'saved newunitid': 'newstep.newunitid === newunitid'
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
                UNITLAYERS: 'overwriteme',
                step: {
                    stepid: 'old'
                }
            },
            mutations: {
                UNITDATA: 'FLAUNTRULEZ',
                ARTIFACTS: 'blank-FLAUNTRULEZ',
                UNITLAYERS: 'new',
                MARKS: {},
                links: 'blank-FLAUNTRULEZnewFLAUNTRULEZsavelink',
                newstepid: 'old-flaunt'
            }
        }
    });
});
