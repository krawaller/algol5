import * as map from 'lodash/map'

export default C => Object.assign(C,{

    addStartTurnFunction: O=> `
        game.start${O.player} = ${C.makeStartFunction(O)};
        game.start${O.player}instruction = ${C.makeInstructionFunction(O,C.startRules(O).instruction)};
    `,

    makeInstructionFunction: (O,expr)=> `
        function(step){
            var MARKS = step.MARKS; 
            var ARTIFACTS = step.ARTIFACTS;
            var UNITLAYERS = step.UNITLAYERS;
            var UNITDATA = step.UNITDATA;
            return ${C.value(O,expr||'')}
        }
    `,
})





