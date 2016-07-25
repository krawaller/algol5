import { markGenerates, markRules } from '../utils'


export default C => Object.assign(C,{

    /*
    */
    makeMarkFunction: O=> `
        function(turn,step,markpos){
            ${C.markFunctionContents(O)}
            return newstep;
        }
    `,

    /*
    */
    markFunctionContents: (O)=> `
        ${C.prepareMarkStep(O)}
        ${C.applyMarkConsequences(O)}
        ${C.saveMarkStep(O)}
        ${C.applyLinkInstructions(O,markRules(O))}
    `,


    // TODO - this isnt enough, linking can also use this data
    /* assumes step */
    prepareMarkStep: O=> markGenerates(O) ? `
        var ARTIFACTS = Object.assign({},step.ARTIFACTS);
        var UNITLAYERS = step.UNITLAYERS;
    ` : ``,

    /*
    assumes markname in options
    assumes step, markpos
    mutates MARKS newstepid and ARTIFACTS (via generators)
    */
    applyMarkConsequences: (O)=> `
        var MARKS = Object.assign({},step.MARKS,{${O.markname}:markpos}); 
        ${C.applyGeneratorInstructions(O,markRules(O))}
    `,

    /*
    assumes step, markpos, turn
    */
    saveMarkStep: (O)=> `
        var newstepid = step.stepid+'-'+markpos;
        var newstep = turn.steps[newstepid] = Object.assign({},step,${C.makeMarkStep(O)});
    `,

    /*
    Assumes newstepid, step.path, ARTIFACTS, MARKS
    */
    makeMarkStep: (O)=> `
    {
        ${markGenerates(O) ? 'ARTIFACTS: ARTIFACTS,' : ''}
        MARKS: MARKS,
        stepid: newstepid,
        path: step.path.concat(markpos)
    }    
    `
})





