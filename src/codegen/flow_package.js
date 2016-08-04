import map from 'lodash/collection/map'

export default C => Object.assign(C,{

    makeGameObject: O=> `
        function(){
            var game = {};
            ${C.addCommonVariables(O)}
            ${C.addPlayerClosure({...O,player:1})}
            ${C.addPlayerClosure({...O,player:2})}
            ${C.addCommonFunctions(O)}
            ${C.addGameData(O)}
            return game;
        }
    `,

    addGameData: O=> `
        game.commands = ${JSON.stringify(Object.keys(O.rules.commands).reduce((mem,c)=>{ mem[c] = 1; return mem; },{}))};
        game.graphics = ${JSON.stringify(O.rules.graphics)};
        game.board = ${JSON.stringify(O.rules.board)};
    `,

    addCommonFunctions: O=> `
        game.newGame = ${C.makeNewGameFunction(O)};
    `,

    // TODO - metadata
    addCommonVariables: O=> `
        var connections = ${C.boardConnections(O)};
        var BOARD = ${C.boardLayers(O)};
        ${C.isTerrainNeutral(O) ? 'var TERRAIN='+C.terrainLayers(O)+'; ' : ''}
    `,

    addPlayerClosure: (O)=> `
        (function(){
            ${C.addPlayerVariables(O)}
            ${C.addPlayerFunctions(O)}
        })();
    `,

    addPlayerVariables: O=> `
        ${C.isTerrainNeutral(O) ? '' : 'var TERRAIN='+C.terrainLayers(O)+';' }
        var ownernames = ${O.player === 2 ? '["neutral","opp","my"]' : '["neutral","my","opp"]'};
        var player = ${O.player};
        var otherplayer = ${O.player === 1 ? 2 : 1};
    `,

    addPlayerFunctions: O=> `
        ${C.addAllMarkFunctions(O)}
        ${C.addAllCommandFunctions(O)}
        ${C.addStartTurnFunction(O)}
    `,

    addAllMarkFunctions: O=> map(O.rules.marks,(def,markname)=> C.addMarkFunction({...O,markname})).join(' '),

    addMarkFunction: O=> `
        game.${O.markname}${O.player} = ${C.makeMarkFunction(O)};
    `,

    addAllCommandFunctions: O=> map(O.rules.commands,(def,cmndname)=> C.addCommandFunction({...O,cmndname})).join(' '),

    addCommandFunction: O=> `
        game.${O.cmndname}${O.player} = ${C.makeCommandFunction(O)};
    `,

    addStartTurnFunction: O=> `
        game.start${O.player} = ${C.makeStartFunction(O)};
    `
})





