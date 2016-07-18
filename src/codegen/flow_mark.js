export default C => Object.assign(C,{

    /* assumes step */
    // TODO - turnvars
    // TODO - send in conscode, only unwrap ARTIFACTS and UNITLAYERS if asked for
    prepareMarkStep: O=> `
        var ARTIFACTS = Object.assign({},step.ARTIFACTS);
        var UNITLAYERS = step.UNITLAYERS;
    `,

    /*
    assumes markname in options
    assumes step, markpos
    mutates MARKS and ARTIFACTS (via generators)
    */
    applyMarkConsequences: (O)=> `
        var MARKS = Object.assign({},step.MARKS,{${O.markname}:markpos})
        ${C.applyGeneratorInstructions(O,O.rules.marks[O.markname]||{})}
    `,

    /*assumes step, turns, markpos*/
    saveMarkStep: (O)=> `
        var stepid = step.stepid;
        var newstepid = stepid+'-'+markpos;
        ${O && O.AI ? '' : `
        var newremovemark = {};
        newremovemark[markpos] = step.stepid;
        `}
        turn.steps[newstepid] = Object.assign({},step,{
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            ${O && O.AI ? '' : `removemarks: Object.assign({},step.removemarks,newremovemark), `}
            stepid: newstepid,
            path: step.path.concat(markpos)
        });
    `
})





