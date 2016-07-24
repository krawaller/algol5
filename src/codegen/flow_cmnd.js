import { contains, cmndRules } from '../utils'

export default C => Object.assign(C,{

    commandFunctionContents: (O)=> `
        ${C.prepareCommandStep(O)}
        ${C.applyCommandConsequences(O)}
        ${C.saveCommandStep(O)}
        ${C.applyLinkInstructions(O,cmndRules(O))}
    `,

    /*
    assumes step
    */
    prepareCommandStep: O=> `
        var ARTIFACTS = step.ARTIFACTS;
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({},step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        ${contains(cmndRules(O),['spawn']) ? 'var newunitid = step.newunitid; ' : ''}
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
        ${contains(cmndRules(O),['spawn']) ? ', newunitid: newunitid' : ''}
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
        ${C.applyEffectInstructions(O,cmndRules(O))}
        MARKS = {};
        ${C.calculateUnitLayers(O)};
        ARTIFACTS = ${C.blankArtifactLayers(O)};
        ${C.applyGeneratorInstructions(O,cmndRules(O))}
    `

})





