export default C => Object.assign(C,{

    makeNewGameFunction: O=> `
        function(){
            var turnseed = ${C.makeTurnSeed(O)};
            var stepseed = ${C.makeStepSeed(O)};
            return game.start1(turnseed,stepseed);
        }
    `,

    makeTurnSeed: O=> `{
        turn: 0
    }`,

    makeStepSeed: O=> `{
        UNITDATA: ${C.deduceInitialUnitData(O)}
        ${C.usesTurnVars(O) ? ', TURNVARS: {}' : ''}
        ${C.contains((O && O.rules || {}),'spawn') ? ', clones: 0' : ''}
    }`,

    makeStartFunction: O=> `
        function(turn,step){
            ${C.startFunctionContents(O)}
            return turn;
        }
    `,

    startFunctionContents: O=> `
        var turn = ${C.makeNewTurn(O)};
        ${C.prepareStartingStep(O)}
        ${C.applyStartingConsequences(O)}
        ${C.saveStartingStep(O)}
        ${C.applyLinkInstructions({...O,root:true},C.startRules(O))}
    `,

    /*
    assumes turn, player (from closure)
    */
    makeNewTurn: (O)=> `{
        steps: {},
        player: player,
        turn: turn.turn+1,
        links: {root:{}}
    }`,

    /*
    assumes step
    */
    // TODO - if has effect we must copy UNITDATA
    prepareStartingStep: O=> `
        var MARKS = {}; 
        var ARTIFACTS = ${C.blankArtifactLayers(O)}; 
        var UNITDATA = step.UNITDATA;
        ${C.usesTurnVars(O) ? 'var TURNVARS = {}; ' : ''}
        ${C.calculateUnitLayers({...O,defineUnitlayers:true})}
    `,

    /*
    assumes turn
    */
    saveStartingStep: (O)=> `
        var newstep = turn.steps.root = ${C.makeStartingStep(O)};
    `,

    /*
    assumes ARTIFACTS, UNITDATA, UNITLAYERS, MARKS
    */
    makeStartingStep: (O)=> `{
        ARTIFACTS: ARTIFACTS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        MARKS: MARKS,
        stepid: 'root',
        name: 'start',
        ${C.contains((O && O.rules || {}),'spawn') ? 'clones: step.clones, ' : ''}
        path: []
        ${C.usesTurnVars(O) ? ',TURNVARS: TURNVARS ' : ''}
    }`,

    /*
    assumes
    */
    applyStartingConsequences: (O)=> `
        ${C.applyGeneratorInstructions(O,C.startRules(O))}
    `

})





