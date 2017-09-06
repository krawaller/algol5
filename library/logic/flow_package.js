import * as map from 'lodash/map'

export default C => Object.assign(C,{

    addAllCommandFunctions: O=> map(O.rules.commands,(def,cmndname)=> C.addCommandFunction({...O,cmndname})).join(' '),

    addCommandFunction: O=> `
        game.${O.cmndname}${O.player} = ${C.makeCommandFunction(O)};
        game.${O.cmndname}${O.player}instruction = ${C.makeInstructionFunction(O,C.cmndRules(O).instruction)};
    `,

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





