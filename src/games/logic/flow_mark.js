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
        ${C.applyLinkInstructions(O,C.markRules(O))}
    `,

    // TODO - this isnt enough, linking can also use this data
    /* assumes step */
    prepareMarkStep: O=> `
        var ARTIFACTS = ${C.copyArtifactsForAction(O,C.markRules(O))};
        var UNITLAYERS = step.UNITLAYERS;
        ${C.usesTurnVars(O) ? 'var TURNVARS = step.TURNVARS; ' : ''}
    `,

    /*
    assumes markname in options
    assumes step, markpos
    mutates MARKS newstepid and ARTIFACTS (via generators)
    */
    applyMarkConsequences: (O)=> {
        let name = O.markname
        let def = C.markRules(O)
        let newMarks = `Object.assign({},step.MARKS,{${O.markname}:markpos})`
        if (def.flow !== 'cyclic'){
            let marks = def.flow.reduce((mem,p)=>{
                switch(p.type){
                    case 'mark': return mem.concat(p.name)
                    case 'command': return []
                    default: return mem
                }
            },[])
            newMarks = '{' + [name+': markpos'].concat(marks.map(mname=> mname+": step.MARKS."+mname)).join(',')+'}'
        }
        return `
            var MARKS = ${newMarks}; 
            ${C.applyGeneratorInstructions(O,C.markRules(O))}
        `
    },

    /*
    assumes step, markpos, turn
    */
    saveMarkStep: (O)=> `
        var newstepid = step.stepid+'-'+markpos;
        var newstep = turn.steps[newstepid] = Object.assign({},step,${C.makeMarkStep(O)});
        turn.links[newstepid] = {};
    `,

    /*
    Assumes newstepid, step.path, ARTIFACTS, MARKS
    */
    makeMarkStep: (O)=> `
    {
        ${C.markGenerates(O) ? 'ARTIFACTS: ARTIFACTS,' : ''}
        MARKS: MARKS,
        stepid: newstepid,
        path: step.path.concat(markpos),
        name: '${O.markname}'
    }    
    `
})





