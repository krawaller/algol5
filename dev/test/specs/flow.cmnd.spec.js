import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow commands",()=>{
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
        }
    })
    test(F,'prepareCommandStep',{
        'for simple call': {
            scope: {
                step: {
                    UNITDATA: {my:'unitdata'},
                    MARKS: {my:'marks'},
                    ARTIFACTS: {my:'artifacts'},
                    UNITLAYERS: {my:'unitlayers'}
                },
            },
            mutations: {
                UNITDATA: {my:'unitdata'},
                MARKS: {my:'marks'},
                ARTIFACTS: {my:'artifacts'},
                UNITLAYERS: {my:'unitlayers'}
            },
            additionally: {
                'copy unitdata': 'UNITDATA !== step.UNITDATA',
                'dont copy artifacts': 'ARTIFACTS === step.ARTIFACTS',
                'dont copy marks': 'MARKS === step.MARKS',
                'dont copy unitlayers': 'UNITLAYERS === step.UNITLAYERS'
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
