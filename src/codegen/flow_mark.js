export default C => Object.assign(C,{

    /* assumes step */
    prepareMarkStep: O=> {
        const rules = O && O.rules && O.rules.marks && O.rules.marks[O.markname] || {}
        return rules.runGenerator || rules.runGenerators ? `
            var ARTIFACTS = Object.assign({},step.ARTIFACTS);
            var UNITLAYERS = step.UNITLAYERS;
        ` : ``
    },

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
    saveMarkStep: (O)=> {
        const rules = O && O.rules && O.rules.marks && O.rules.marks[O.markname] || {}
        return `
            var stepid = step.stepid;
            var newstepid = stepid+'-'+markpos;
            ${O && O.AI ? '' : `
            var newremovemark = {};
            newremovemark[markpos] = step.stepid;
            `}
            turn.steps[newstepid] = Object.assign({},step,{
                ${rules.runGenerator || rules.runGenerators ? 'ARTIFACTS: ARTIFACTS,' : ''}
                MARKS: MARKS,
                ${O && O.AI ? '' : `removemarks: Object.assign({},step.removemarks,newremovemark), `}
                stepid: newstepid,
                path: step.path.concat(markpos)
            });
        `
    }
})





