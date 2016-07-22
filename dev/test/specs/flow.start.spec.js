import test from '../gentester'
import lib from '../../../src/codegen/'

describe("The flow start stuff",()=>{
    test(lib,'prepareStartingStep',{
        'for regular start': {
            scope: {
                step: {UNITDATA: 'woo'}
            },
            context: {
                calculateUnitLayers: (O)=> 'var didunits=UNITDATA+"'+(O && O.defineUnitLayers?'yes':'no')+'"; ',
                blankArtifactLayers: (O)=> '(Object.keys(MARKS).length === 0)+1'
            },
            mutations: {
                UNITDATA: 'woo',
                MARKS: {},
                didunits: 'wooyes',
                ARTIFACTS: 2
            }
        }
    })
    test(lib,'saveStartingStep',{
        'for regular start': {
            scope: {
                ARTIFACTS: 'artifacts',
                UNITDATA: 'unitdata',
                UNITLAYERS: 'unitlayers',
                MARKS: 'marks',
                turn: {steps:{foo:'bar'}}
            },
            mutations: {
                turn: {
                    steps: {
                        foo: 'bar',
                        root: {
                            stepid: 'root',
                            ARTIFACTS: 'artifacts',
                            UNITDATA: 'unitdata',
                            UNITLAYERS: 'unitlayers',
                            MARKS: 'marks',
                            path: []
                        }
                    }
                }
            }
        }
    })
    test(lib,'applyStartingConsequences',{
        'for regular start': {
            options: {
                rules: {
                    startTurn: 'startdef'
                }
            },
            context: {
                saveStartingStep: (O)=> 'var save = "save"; ',
                applyLinkInstructions: (O,def)=> 'var links = save+"links'+def+'"; '
            },
            mutations: {
                links: 'savelinksstartdef'
            }
        }
    })
});
