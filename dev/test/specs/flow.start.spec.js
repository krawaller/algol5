import test from '../gentester'
import lib from '../../../src/codegen/'

describe("The flow start stuff",()=>{
    test(lib,'makeNewGameFunction',{
        'for regular call': {
            context: {
                makeStepSeed: O=> '"step"',
                makeTurnSeed: O=> '"turn"'
            },
            scope: {
                game: {
                    start1: function(s,t){ return s+t; }
                }
            },
            execwith: [],
            expected: "turnstep"
        }
    })
    test(lib,'makeTurnSeed',{
        'for regular call': {
            expected: {
                turn: 0
            }
        }
    })
    test(lib,'makeStepSeed',{
        'for regular call': {
            options: '"OPTS"',
            context: {
                deduceInitialUnitData: O=> O
            },
            expected: {
                UNITDATA: 'OPTS'
            }
        }
    })
    test(lib,'makeStartFunction',{
        'for regular call': {
            options: '"OPTS"',
            context: {
                startFunctionContents: (O)=> 'var turn = turn+step; '
            },
            execwith: [1,2],
            expected: 3
        }
    })
    test(lib,'startFunctionContents',{
        'for regular call': {
            options: {
                rules: {startTurn: 'startdef'}
            },
            scope: {
                debug: ''
            },
            context: {
                makeNewTurn: O=> '"new"',
                prepareStartingStep: O=> 'debug += "prep"; ',
                applyStartingConsequences: O=> 'debug += "cons"; ',
                saveStartingStep: O=> 'debug += "save"; ',
                applyLinkInstructions: (O,def)=> 'debug += "link'+def+'"; '
            },
            mutations: {
                turn: 'new',
                debug: 'prepconssavelinkstartdef'
            }
        }
    })
    test(lib,'makeNewTurn',{
        'for regular call': {
            scope: {
                player: 'foo'
            },
            expected: {
                steps: {},
                player: 'foo'
            }
        }
    })
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
                turn: {steps:{foo:'bar'}}
            },
            context: {
                makeStartingStep: (O)=> '"start"'
            },
            mutations: {
                turn: {
                    steps: {
                        foo: 'bar',
                        root: 'start'
                    }
                }
            }
        }
    })
    test(lib,'makeStartingStep',{
        'for regular start': {
            scope: {
                ARTIFACTS: 'artifacts',
                UNITDATA: 'unitdata',
                UNITLAYERS: 'unitlayers',
                MARKS: 'marks'
            },
            expected: {
                stepid: 'root',
                ARTIFACTS: 'artifacts',
                UNITDATA: 'unitdata',
                UNITLAYERS: 'unitlayers',
                MARKS: 'marks',
                path: []
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
                applyGeneratorInstructions: (O,rules)=> 'var gen = "GEN'+rules+'"; ',
            },
            mutations: {
                gen: 'GENstartdef'
            }
        }
    })
});
