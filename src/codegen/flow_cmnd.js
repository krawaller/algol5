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
        var ARTIFACTS = ${C.copyArtifactsForAction(O,C.cmndRules(O))};
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({},step.UNITDATA);
        ${C.contains(C.cmndRules(O),'spawn') ? 'var clones = step.clones; ' : ''}
        var UNITLAYERS = step.UNITLAYERS;
        ${C.usesTurnVars(O) ? 'var TURNVARS = Object.assign({},step.TURNVARS); ' : ''}
    `,

    /*
    assumed ARTIFACTS, MARKS, UNITDATA, UNITLAYERS, newstepid, step, clones
    */
    makeCommandStep: (O)=> `
    {
        ARTIFACTS: ARTIFACTS,
        MARKS: MARKS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        stepid: newstepid,
        name: '${O.cmndname}',
        path: step.path.concat('${O.cmndname}')
        ${C.contains(C.cmndRules(O),'spawn') ? ', clones: clones' : ''}
        ${C.usesTurnVars(O) ? ',TURNVARS: TURNVARS ' : ''}
    }
    `,

    /*
    assumes step, turn
    */
    saveCommandStep: (O)=> `
        var newstepid = step.stepid+'-'+'${O.cmndname}';
        var newstep = turn.steps[newstepid] = Object.assign({},step,${C.makeCommandStep(O)});
        turn.links[newstepid] = {};
    `,

    /*
    assumes cmndname as option
    */
    applyCommandConsequences: (O)=> `
        ${C.applyEffectInstructions(O,C.cmndRules(O))}
        MARKS = {};
        ${C.calculateUnitLayers(O)}
        ARTIFACTS = ${C.blankArtifactLayers(O)};
        ${C.applyGeneratorInstructions(O,C.cmndRules(O))}
    `

})





