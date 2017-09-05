import map from 'lodash/map'

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
        game.AI = ${JSON.stringify(Object.keys(O.rules.AI && O.rules.AI.brains||{}))};
        game.id = "${O.rules.meta.id}";
    `,

    // TODO - move out reduce to toplevel
    addCommonFunctions: O=> `
        function reduce(coll,iterator,acc){
            for(var key in coll){
                acc = iterator(acc,coll[key],key);
            }
            return acc;
        }
        game.newGame = ${C.makeNewGameFunction(O)};
        game.debug = function(){
            return {
                BOARD: BOARD,
                connections: connections,
                plr1: game.debug1(),
                plr2: game.debug2()
            };
        }
    `,

    // TODO - metadata
    addCommonVariables: O=> `
        var boardDef = ${JSON.stringify(O.rules.board)};
        var connections = boardConnections(boardDef);
        var BOARD = boardLayers(boardDef);
        var relativedirs = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]; 
        ${C.isTerrainNeutral(O) ? `var TERRAIN = terrainLayers(boardDef, 0${O.rules.AI && O.rules.AI.terrain ? `, ${JSON.stringify(O.rules.AI.terrain)}` : ''}); ` : ''}
    `,

    addPlayerClosure: (O)=> `
        (function(){
            ${C.addPlayerVariables(O)}
            ${C.addPlayerFunctions(O)}
        })();
    `,

    addPlayerVariables: O=> `
        ${C.isTerrainNeutral(O) ? '' : `var TERRAIN = terrainLayers(boardDef, ${O.player}${O.rules.AI && O.rules.AI.terrain ? `, ${JSON.stringify(O.rules.AI.terrain)}` : ''}); `}
        var ownernames = ${O.player === 2 ? '["neutral","opp","my"]' : '["neutral","my","opp"]'};
        var player = ${O.player};
        var otherplayer = ${O.player === 1 ? 2 : 1};
        ${C.addAllScoringsForPlayer(O)}
    `,

    addPlayerFunctions: O=> `
        ${C.addAllMarkFunctions(O)}
        ${C.addAllCommandFunctions(O)}
        ${C.addStartTurnFunction(O)}
        ${C.addAI(O)}
        game.debug${O.player} = function(){
            return {TERRAIN:TERRAIN};
        }
    `,

    addAllMarkFunctions: O=> map(O.rules.marks,(def,markname)=> C.addMarkFunction({...O,markname})).join(' '),

    addMarkFunction: O=> `
        game.${O.markname}${O.player} = ${C.makeMarkFunction(O)};
        game.${O.markname}${O.player}instruction = ${C.makeInstructionFunction(O,C.markRules(O).instruction)};
    `,

    addAllCommandFunctions: O=> map(O.rules.commands,(def,cmndname)=> C.addCommandFunction({...O,cmndname})).join(' '),

    addCommandFunction: O=> `
        game.${O.cmndname}${O.player} = ${C.makeCommandFunction(O)};
        game.${O.cmndname}${O.player}instruction = ${C.makeInstructionFunction(O,C.cmndRules(O).instruction)};
    `,

    addStartTurnFunction: O=> `
        game.start${O.player} = ${C.makeStartFunction(O)};
        game.start${O.player}instruction = ${C.makeInstructionFunction(O,C.startRules(O).instruction)};
    `,

    makeInstructionFunction: (O,expr)=> `
        function(step){
            var MARKS = step.MARKS; 
            var ARTIFACTS = step.ARTIFACTS;
            var UNITLAYERS = step.UNITLAYERS;
            var UNITDATA = step.UNITDATA;
            return ${C.value(O,expr||'')}
        }
    `,
})





