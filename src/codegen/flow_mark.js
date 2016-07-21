export default C => Object.assign(C,{

    // TODO - this isnt enough, linking can also use this data

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
    mutates MARKS newstepid and ARTIFACTS (via generators)
    */
    applyMarkConsequences: (O)=> `
        var MARKS = Object.assign({},step.MARKS,{${O.markname}:markpos}); 
        ${C.applyGeneratorInstructions(O,O.rules.marks[O.markname]||{})}
        ${C.saveMarkStep(O)}
        ${C.applyLinkInstructions(O,O.rules.marks[O.markname]||{})}
    `,

    /*assumes step, newstepid, markpos, turn*/
    saveMarkStep: (O)=> {
        const rules = O && O.rules && O.rules.marks && O.rules.marks[O.markname] || {}
        return `
            var newstepid = step.stepid+'-'+markpos;
            var newstep = turn.steps[newstepid] = Object.assign({},step,{
                ${rules.runGenerator || rules.runGenerators ? 'ARTIFACTS: ARTIFACTS,' : ''}
                MARKS: MARKS,
                stepid: newstepid,
                path: step.path.concat(markpos)
            });
        `
    }
})





