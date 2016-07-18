export default C => Object.assign(C,{

    /* assumes step */
    // TODO - turnvars
    prepareCommandStep: O=> `
        var ARTIFACTS = step.ARTIFACTS;
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({},step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
    `,

    /*assumes step, turn, commandname*/ // TODO - add newunitid if needed!
    saveCommandStep: (O)=> `
        var stepid = step.stepid;
        var newstepid = stepid+'-'+commandname;
        turn.steps[newstepid] = Object.assign({},step,{
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            ${O && O.AI ? '' : `undo: stepid, `}
            stepid: newstepid,
            path: step.path.concat(commandname)
        });
        ${O && O.AI ? '' : `delete turn.steps[newstepid].removemarks; `}
    `,

    /*
    assumes cmndname as option
    TODO
        turnvars
        link!
    */
    applyCommandConsequences: (O)=> `
        ${C.applyEffectInstructions(O,O.rules.commands[O.cmndname])}
        MARKS = {};
        ${C.calculateUnitLayers(O)};
        ARTIFACTS = ${C.blankArtifactLayers(O)};
        ${C.applyGeneratorInstructions(O,O.rules.commands[O.cmndname])}
    `
})





