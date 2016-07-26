
export default C => Object.assign(C,{

    makeGameObject: O=> `
        function(){
            var game = {};
            ${C.addCommonVariables(O)}
            ${C.addPlayerClosure(O,1)}
            ${C.addPlayerClosure(O,2)}
            return game;
        }
    `,

    addCommonVariables: O=> `
        var connections = ${C.boardConnections(O)};
        var BOARD = ${C.boardLayers(O)};
        ${C.isTerrainNeutral(O) ? 'var terrain='+C.terrainLayers(O)+'; ' : ''}
    `,

    addPlayerClosure: O=> `
        (function(){
            ${C.addPlayerVariables(O)}
            ${C.addPlayerFunctions(O)}
        })();
    `,

    addPlayerVariables: O=> `
        ${C.isTerrainNeutral(O) ? '' : 'var terrain='+C.terrainLayers(O)+';' }
        var ownernames = ${O.player === 2 ? '["neutral","opp","my"]' : '["neutral","my","opp"]'};
        var player = ${O.player};
    `
})





