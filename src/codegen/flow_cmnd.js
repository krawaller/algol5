export default C => Object.assign(C,{

    /*
    */
    makeCommandFunction: O=> `
        function(turn,step){
            ${C.commandFunctionContents(O)}
            return newstep;
        }
    `,

    /*
    */
    commandFunctionContents: (O)=> `
        ${C.prepareCommandStep(O)}
        ${C.applyCommandConsequences(O)}
        ${C.saveCommandStep(O)}
        ${C.applyLinkInstructions(O,C.cmndRules(O))}
    `,

    /*
    assumes step
    */
    prepareCommandStep: O=> `
        var ARTIFACTS = step.ARTIFACTS;
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({},step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        ${C.usesTurnVars(O) ? 'var TURNVARS = Object.assign({},step.TURNVARS); ' : ''}
        ${C.contains(C.cmndRules(O),['spawn']) ? 'var newunitid = step.newunitid; ' : ''}
    `,

    /*
    assumed ARTIFACTS, MARKS, UNITDATA, UNITLAYERS, newstepid, step, newunitid
    */
    makeCommandStep: (O)=> `
    {
        ARTIFACTS: ARTIFACTS,
        MARKS: MARKS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        stepid: newstepid,
        path: step.path.concat('${O.cmndname}')
        ${C.contains(C.cmndRules(O),['spawn']) ? ', newunitid: newunitid' : ''}
    }
    `,

    /*
    assumes step, turn
    */
    saveCommandStep: (O)=> `
        var newstepid = step.stepid+'-'+'${O.cmndname}';
        var newstep = turn.steps[newstepid] = Object.assign({},step,${C.makeCommandStep(O)});
    `,

    /*
    assumes cmndname as option
    */
    applyCommandConsequences: (O)=> `
        ${C.applyEffectInstructions(O,C.cmndRules(O))}
        MARKS = {};
        ${C.calculateUnitLayers(O)};
        ARTIFACTS = ${C.blankArtifactLayers(O)};
        ${C.applyGeneratorInstructions(O,C.cmndRules(O))}
    `

})





