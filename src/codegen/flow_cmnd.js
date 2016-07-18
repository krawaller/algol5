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

    /*assumes step, turn */
    saveCommandStep: (O)=> `
        var stepid = step.stepid;
        var newstepid = stepid+'-'+'${O.cmndname}';
        turn.steps[newstepid] = Object.assign({},step,{
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            ${O && O.AI ? '' : `undo: stepid, `}
            stepid: newstepid,
            path: step.path.concat('${O.cmndname}')
            ${contains(O && O.rules && O.rules && O.rules.commands && O.rules.commands[O.cmndname],['spawn']) ? ', newunitid: newunitid' : ''}
        });
        ${O && O.AI ? '' : `delete turn.steps[newstepid].removemarks; `}
    `,

    /*
    assumes cmndname as option
    */
    applyCommandConsequences: (O)=> `
        ${C.applyEffectInstructions(O,O.rules.commands[O.cmndname])}
        MARKS = {};
        ${C.calculateUnitLayers(O)};
        ARTIFACTS = ${C.blankArtifactLayers(O)};
        ${C.applyGeneratorInstructions(O,O.rules.commands[O.cmndname])}
        ${C.applyLinkInstructions(O,O.rules.commands[O.cmndname])}
    `
})





