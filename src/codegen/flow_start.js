import { startRules } from '../utils'

export default C => Object.assign(C,{

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
        ${C.applyLinkInstructions(O,startRules(O))}
    `,

    /*
    assumes turn, player (from closure)
    */
    makeNewTurn: (O)=> `{
        steps: {},
        player: player
    }`,

    /*
    assumes step
    */
    // TODO - if has effect we must copy UNITDATA
    prepareStartingStep: O=> `
        var MARKS = {}; 
        var ARTIFACTS = ${C.blankArtifactLayers(O)}; 
        var UNITDATA = step.UNITDATA;
        ${C.calculateUnitLayers({...O,defineUnitLayers:true})}
    `, // TODO - dont generate, reuse! :D

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
        path: []
    }`,

    /*
    assumes
    */
    applyStartingConsequences: (O)=> `
        ${C.applyGeneratorInstructions(O,startRules(O))}
    `

})





