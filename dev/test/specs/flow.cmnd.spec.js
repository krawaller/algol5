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
                    path: ['foo'],
                    removemarks: 'deleteme'
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                turn: {steps: {otherstep:'FOO'}}
            },
            mutations: {
                turn: {steps: {
                    otherstep: 'FOO',
                    'oldid-somecmnd': {
                        ARTIFACTS: 'newartifacts',
                        MARKS: 'newmarks',
                        UNITDATA: 'newunitdata',
                        UNITLAYERS: 'newunitlayers',
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
                    path: ['foo'],
                    removemarks: 'deleteme'
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                UNITDATA: 'newunitdata',
                UNITLAYERS: 'newunitlayers',
                turn: {steps: {otherstep:'FOO'}},
                newunitid: 42
            },
            additionally: {
                'saved newunitid': 'turn.steps["oldid-somecmnd"].newunitid === newunitid'
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
        'when not passing AI flag': {
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
