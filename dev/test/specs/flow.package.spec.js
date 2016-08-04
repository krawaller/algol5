import test from '../gentester'
import lib from '../../../src/codegen/'

describe("The flow package commands",()=>{
    test(lib,'makeGameObject',{
        'for regular game': {
            options: {foo:'"O"'},
            context: {
                addCommonVariables: O=> `game.common = ${O.foo}; `,
                addPlayerClosure: O=> `game.plr${O.player}=game.common; `,
                addCommonFunctions: O=> `game.cfunc = ${O.foo}; `,
                addGameData: O=> `game.data = ${O.foo}; `

            },
            execwith: [],
            expected: {
                common: 'O',
                plr1: 'O',
                plr2: 'O',
                cfunc: 'O',
                data: 'O'
            }
        }
    })
    test(lib,'addCommonFunctions',{
        'for regular call': {
            options: '"O"',
            context: {
                makeNewGameFunction: O=> O
            },
            scope: {
                game: {foo:'bar'}
            },
            mutations: {
                game: {
                    foo: 'bar',
                    newGame: 'O'
                }
            }
        }
    })
    test(lib,'addCommonVariables',{
        'for game with non-neutral terrain': {
            options: '"O"',
            context: {
                isTerrainNeutral: O=> false,
                boardConnections: O=> '"board"',
                boardLayers: O=> '"layers"',
                terrainLayers: O=> {throw "Dont call me"}
            },
            mutations: {
                BOARD: 'layers',
                connections: 'board'
            }
        },
        'for game with neutral terrain': {
            options: '"O"',
            context: {
                isTerrainNeutral: O=> true,
                boardConnections: O=> '"board"',
                boardLayers: O=> '"layers"',
                terrainLayers: O=> '"terrain"'
            },
            mutations: {
                BOARD: 'layers',
                connections: 'board',
                TERRAIN: 'terrain'
            }
        }
    })
    test(lib,'addPlayerClosure',{
        'for regular game': {
            options: '"O"',
            scope: {
                outer: ''
            },
            context: {
                addPlayerVariables: O=> 'var secret=42;',
                addPlayerFunctions: O=> 'outer = secret;'
            },
            mutations: {
                outer: 42
            },
            additionally: {
                'secret is hidden in closure': '"undefined" == typeof secret'
            }
        }
    })
    test(lib,'addPlayerVariables',{
        'for game with neutral terrain, plr 1': {
            options: {player:1},
            context: {
                isTerrainNeutral: O=> true,
                terrainLayers: O=> {throw "Dont call me"}
            },
            mutations: {
                ownernames: ['neutral','my','opp'],
                player: 1,
                otherplayer: 2
            }
        },
        'for game with non-neutral terrain, plr 2': {
            options: {player:2},
            context: {
                isTerrainNeutral: O=> false,
                boardConnections: O=> '"board"',
                boardLayers: O=> '"layers"',
                terrainLayers: O=> '"terrain"'
            },
            mutations: {
                TERRAIN: 'terrain',
                ownernames: ['neutral','opp','my'],
                player: 2,
                otherplayer: 1
            }
        }
    })
    test(lib,'addPlayerFunctions',{
        'for regular game': {
            context: {
                addAllMarkFunctions: O=> 'debug += "marks"; ',
                addAllCommandFunctions: O=> 'debug += "cmnds"; ',
                addStartTurnFunction: O=> 'debug += "start"; '
            },
            scope: {
                debug : ''
            },
            mutations: {
                debug: 'markscmndsstart'
            }
        }
    })
    test(lib,'addAllMarkFunctions',{
        'for regular game': {
            options: {
                rules: {
                    marks: {
                        foo: "FOO",
                        bar: "BAR"
                    }
                }
            },
            context: {
                addMarkFunction: O=> 'debug += "'+O.markname+'"; '
            },
            scope: {
                debug: ''
            },
            mutations: {
                debug: 'foobar'
            }
        }
    })
    test(lib,'addMarkFunction',{
        'for regular game': {
            options: {
                markname: 'somemark',
                player: 666
            },
            context: {
                makeMarkFunction: O=> '"markfunc"'
            },
            scope: {
                game: {
                    othermark: 'foobar'
                }
            },
            mutations: {
                game: {
                    othermark: 'foobar',
                    somemark666: 'markfunc'
                }
            }
        }
    })
    test(lib,'addAllCommandFunctions',{
        'for regular game': {
            options: {
                rules: {
                    commands: {
                        foo: "FOO",
                        bar: "BAR"
                    }
                }
            },
            context: {
                addCommandFunction: O=> 'debug += "'+O.cmndname+'"; '
            },
            scope: {
                debug: ''
            },
            mutations: {
                debug: 'foobar'
            }
        }
    })
    test(lib,'addCommandFunction',{
        'for regular game': {
            options: {
                cmndname: 'somecmnd',
                player: 777
            },
            context: {
                makeCommandFunction: O=> '"cmndfunc"'
            },
            scope: {
                game: {
                    othercmnd: 'foobar'
                }
            },
            mutations: {
                game: {
                    othercmnd: 'foobar',
                    somecmnd777: 'cmndfunc'
                }
            }
        }
    })
    test(lib,'addStartTurnFunction',{
        'for regular game': {
            options: {
                player: 888
            },
            context: {
                makeStartFunction: O=> '"startfunc"'
            },
            scope: {
                game: {
                    other: 'foobar'
                }
            },
            mutations: {
                game: {
                    other: 'foobar',
                    start888: 'startfunc'
                }
            }
        }
    })
})









