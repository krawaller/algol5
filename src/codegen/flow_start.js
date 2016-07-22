export default C => Object.assign(C,{

    /*
    assumes step
    */
    // TODO - if has effect we must copy UNITDATA
    prepareStartingStep: O=> `
        var MARKS = {}; 
        var ARTIFACTS = ${C.blankArtifactLayers(O)}; 
        var UNITDATA = step.UNITDATA;
        ${C.calculateUnitLayers({...O,defineUnitLayers:true})}
    `,

    /*
    assumes turn
    */
    saveStartingStep: (O)=> `
        var newstep = turn.steps.root = {
            ARTIFACTS: ARTIFACTS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            MARKS: MARKS,
            stepid: 'root',
            path: []
        };
    `,

    /*
    assumes
    */
    applyStartingConsequences: (O)=> `
        ${C.saveStartingStep(O)}
        ${C.applyLinkInstructions(O,O.rules.startTurn)}
    `

})





