import reduce from 'lodash/collection/reduce'

export default C => Object.assign(C,{

    addAI: O=> reduce(O.rules.AI && O.rules.AI.brains,(ret,def,name)=>
        ret + `game.brain_${name}_${O.player} = ${C.makeBrainFunction(O,name)};`
            + `game.brain_${name}_${O.player}_detailed = ${C.makeBrainFunction(O,name,true)};`
    ,''),

    makeBrainFunction: (O,brain,detailed)=> `
        function(step){
            ${C.prepBrain(O,brain)}
            ${C.runBrainGenerators(O,brain)}
            return ${detailed ? C.calculateDetailedBrainScore(O,brain) : C.calculateBrainScore(O,brain)};
        }
    `,

    prepBrain: (O,brain)=> `
        var ARTIFACTS = step.ARTIFACTS;
        var UNITLAYERS = step.UNITLAYERS;
        ${ O.rules.AI.brains[brain].generators.reduce((mem,genname)=>{
            return mem.concat(Object.keys(C.generatorLayers(O.rules.AI.generators[genname])))
           },[]).map(l=> 'ARTIFACTS.'+l+' = {}; ').join('')
        }
    `,

    runBrainGenerators: (O,brain)=>
        O.rules.AI.brains[brain].generators.reduce((mem,genname)=>
            mem + C.applyGenerator(O,O.rules.AI.generators[genname])
        ,''),

    calculateBrainScore: (O,brain)=> {
        let plus = reduce(O.rules.AI.brains[brain].plus,(mem,calc)=>
            console.log("CALC",calc) ||
            mem.concat(C.value(O,calc))
        ,[]).join(' + ')
        let minus = reduce(O.rules.AI.brains[brain].minus,(mem,calc)=>
            mem + ' - ' + C.value(O,calc)
        ,'')
        return plus + minus
    },

    calculateDetailedBrainScore: (O,brain)=> {
        let plus = reduce(O.rules.AI.brains[brain].plus,(mem,calc,name)=>
            mem.concat(name+': '+C.value(O,calc))
        ,[])
        let minus = reduce(O.rules.AI.brains[brain].minus,(mem,calc,name)=>
            mem.concat(name+': -'+C.value(O,calc))
        ,[])
        return '{'+plus.concat(minus).join(', ')+'}'
    }

})





