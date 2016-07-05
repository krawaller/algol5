import tail from "lodash/array/tail"
import uniq from "lodash/array/uniq"
import map from "lodash/collection/map"
import reduce from "lodash/collection/reduce"

import U from '../utils'

export default C => Object.assign(C,{

    // ******************** DATATYPE instruction **********************

    instruction: (O,def)=> { // TODO - add in linktoendturn and other links
        if (C['instr_'+def[0]]) {
            return C['instr_'+def[0]](O,tail(def));
        } else if (O && O.effect){ // TODO - need this check? fix through other means?
            return C.applyeffect(O,def)
        } else if (O && O.generating && O.rules && O.rules.generators[def]){
            return C.applyGenerator(O,O.rules.generators[def])
        } else {
            throw "Unknown instruction def: "+def;
        }
    },

    instr_if: (O,[bool,instr])=> 'if ('+C.boolean(O,bool)+'){'+C.instruction(O,instr)+'} ',
    instr_ifelse: (O,[bool,alt1,alt2])=> "if (" + C.boolean(O,bool) + "){" + C.instruction(O,alt1) + "} else {" + C.instruction(O,alt2) + "}",
    instr_ifplayer: (O,[plr,instr])=> plr === O.player ? C.instruction(O,instr) : '',
    instr_playercase: (O,[alt1,alt2])=> C.instruction(O,O.player === 1 ? alt1 : alt2),
    instr_all: (O,[defs])=> defs.map(d=>C.instruction(O,d)).join(' '),

    // ******************** rest **********************

    applyEffectInstructions: (O,instr)=> {
        O = {effect:true, ...(O || {})}
        let copy = 'UNITDATA = Object.assign({},UNITDATA); '
        if (instr.applyEffect) {
            return copy+C.instruction(O,instr.applyEffect)
        } else if (instr.applyEffects) {
            return copy+C.instruction(O,['all'].concat(instr.applyEffects))
        } else {
            return '';
        }
    },
    applyGeneratorInstructions: (O,instr)=> {
        O = {generating:true, ...(O || {})}
        if (instr.runGenerator) {
            return C.instruction(O,instr.runGenerator)
        } else if (instr.runGenerators) {
            return C.instruction(O,['all'].concat(instr.runGenerators))
        } else {
            return '';
        }
    },
    linkToEndturn: (O)=> {
        let ret = C.applyGeneratorInstructions({generating:true, ...(O || {})},O.rules.endturn || {})
        return ret + map(O.rules.endturn && O.rules.endturn.unless,(cond,name)=> {
            return 'if ('+C.boolean(O,cond)+'){ blockedby = "'+name+'"; } '
        }).concat(map(O.rules.endgame,(def,name)=> { // TODO - perhaps perffix below?
            return `
                if (${C.boolean(O,def.condition)}) { 
                    var winner = ${C.value(O,def.who||['currentplayer'])};
                    links.endturn = winner === ${O.player} ? 'win' : winner ? 'lose' : 'draw';
                    links.gameendby = '${name}';
                }`;
        })).concat('links.endturn = "next"; ').join(' else ')
    },

    /*
    assumes markname, markpos, stepid
    mutates MARKS, removemarks (but new ref), stepid
    */
    applyMarkConsequences: (O)=> `
        MARKS[markname] = markpos;
        ${O && O.AI ? '' : `
            removemarks = Object.assign({},removemarks);
            removemarks[markname] = stepid;
        `}
        stepid = stepid+= "-"+markpos;
        path = path.concat(markpos);
        ${C.applyGeneratorInstructions(O,O.rules.marks[O.markname]||{})}
    `,
 
    /*
    assumes cmndname, stepid, path

    (1) set stepid, path & undo (if human)
    (2) apply effects
    (3) clear artifacts & marks
    (4) apply generators

    clear removemarks // if human, in cleanup, not here
    */
    applyCommandConsequences: (O)=> `
        ${O && O.AI ? '' : 'var undo = stepid; '}
        stepid = stepid+"-"+cmndname;
        path = path.concat(cmndname);
        ${C.applyEffectInstructions(O,O.rules.commands[O.cmndname])}
        ARTIFACTS = ${C.blankArtifactLayers(O)};
        MARKS = {};
        ${C.applyGeneratorInstructions(O,O.rules.commands[O.cmndname])}
    `,

    applyStartTurnConsequences: (O,plr)=> `
    `
})





