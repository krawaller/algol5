import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The flow mark stuff",()=>{
    test(F,'prepareMarkStep',{
        'for simple call': {
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
        'when no AI flag': {
            scope: {
                markpos: 'somepos',
                step: {
                    ARTIFACTS: 'overwriteme',
                    MARKS: 'overwriteme',
                    otherstuff: 'saveme',
                    stepid: 'oldid',
                    path: ['foo'],
                    removemarks: { otherpos: 'otherid' }
                },
                ARTIFACTS: 'newartifacts',
                MARKS: 'newmarks',
                turn: {steps: {otherstep:'FOO'}}
            },
            mutations: {
                turn: {steps: {
                    otherstep: 'FOO',
                    'oldid-somepos': {
                        ARTIFACTS: 'newartifacts',
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
