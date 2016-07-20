import { contains } from '../utils'

export default C => Object.assign(C,{

    /* assumes step */
    // TODO - turnvars
    prepareCommandStep: O=> `
        var ARTIFACTS = step.ARTIFACTS;
        var MARKS = step.MARKS;
        var UNITDATA = Object.assign({},step.UNITDATA);
        var UNITLAYERS = step.UNITLAYERS;
        ${contains(O && O.rules && O.rules && O.rules.commands && O.rules.commands[O.cmndname],['spawn']) ? 'var newunitid = step.newunitid; ' : ''}
    `,

    /*assumes step, newstepid, turn */
    saveCommandStep: (O)=> `
        var newstep = Object.assign({},step,{
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('${O.cmndname}')
            ${contains(O && O.rules && O.rules && O.rules.commands && O.rules.commands[O.cmndname],['spawn']) ? ', newunitid: newunitid' : ''}
        });
    `,

    /*
    assumes cmndname as option
    assumes step
    */
    applyCommandConsequences: (O)=> `
        ${C.applyEffectInstructions(O,O.rules.commands[O.cmndname])}
        MARKS = {};
        ${C.calculateUnitLayers(O)};
        ARTIFACTS = ${C.blankArtifactLayers(O)};
        ${C.applyGeneratorInstructions(O,O.rules.commands[O.cmndname])}
        var newstepid = step.stepid+'-'+'${O.cmndname}';
        ${C.saveCommandStep(O)}
        ${C.applyLinkInstructions(O,O.rules.commands[O.cmndname])}
    `

})





