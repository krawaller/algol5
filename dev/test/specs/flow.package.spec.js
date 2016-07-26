import test from '../gentester'
import lib from '../../../src/codegen/'

describe("The flow package commands",()=>{
    test(lib,'makeGameObject',{
        'for regular game': {
            options: '"O"',
            context: {
                addCommonVariables: O=> `game.common = ${O}; `,
                addPlayerClosure: (O,plr)=> `game.plr${plr}=game.common; `
            },
            execwith: [],
            expected: {
                common: 'O',
                plr1: 'O',
                plr2: 'O'
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
                terrain: 'terrain'
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
                player: 1
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
                terrain: 'terrain',
                ownernames: ['neutral','opp','my'],
                player: 2
            }
        }
    })
})









