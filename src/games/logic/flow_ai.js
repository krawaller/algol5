import reduce from 'lodash/reduce'

export default C => Object.assign(C,{

    addAllScoringsForPlayer: (O)=> reduce(O.rules && O.rules.AI && O.rules.AI.scorings,
        (str,def,name)=> str + C.addScoringForPlayer(O,name,def), ''
    ),

    addScoringForPlayer: (O,name,def)=> {
        let names = (O.player === 1 ? ['my'+name,'opp'+name] : ['opp'+name,'my'+name])
        let plr2def = (def[1] === 'mirror' ? def[0].slice().reverse() : def[1])
        return `
            var ${names[0]} = ${C.parseScoring(O,def[0])};
            var ${names[1]} = ${C.parseScoring(O,plr2def)};
        `
    },

    parseScoring: (O,def)=> JSON.stringify(def.reduce((mem,row,r)=>row.reduce((m,val,c)=>({
        [C.coords2pos({x:c+1,y:def.length-r})]: (val || 0), ...m
    }),mem),{})),

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
        ${ (O.rules.AI.brains[brain].generators||[]).reduce((mem,genname)=>{
            return mem.concat(Object.keys(C.generatorLayers(O.rules.AI.generators[genname])))
           },[]).map(l=> 'ARTIFACTS.'+l+' = {}; ').join('')
        }
    `,

    runBrainGenerators: (O,brain)=>
        (O.rules.AI.brains[brain].generators||[]).reduce((mem,genname)=>
            mem + C.applyGenerator(O,O.rules.AI.generators[genname])
        ,''),

    calculateBrainScore: (O,brain)=> {
        let aspects = O.rules.AI.aspects
        let plus = reduce(O.rules.AI.brains[brain].plus,(mem,weight,name)=>
            mem.concat( (weight === 1 ? '' : weight+' * ')+C.value(O,aspects[name]) )
        ,[]).join(' + ')
        let minus = reduce(O.rules.AI.brains[brain].minus,(mem,weight,name)=>
            mem + ' - ' + (weight === 1 ? '' : weight+' * ')+C.value(O,aspects[name])
        ,'')
        return plus + minus
    },

    calculateDetailedBrainScore: (O,brain)=> {
        let aspects = O.rules.AI.aspects
        let plus = reduce(O.rules.AI.brains[brain].plus,(mem,weight,name)=>
            mem.concat(name+': '+(weight === 1 ? '' : weight+' * ')+C.value(O,aspects[name]))
        ,[])
        let minus = reduce(O.rules.AI.brains[brain].minus,(mem,weight,name)=>
            mem.concat(name+': -'+(weight === 1 ? '' : weight+' * ')+C.value(O,aspects[name]))
        ,[])
        return '{'+plus.concat(minus).join(', ')+'}'
    }

})





