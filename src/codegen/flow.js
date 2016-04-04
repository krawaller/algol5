import _ from "lodash";
import C from "./core";
import G from "./generate";
import E from "./effect";


const instructionTypes = {
    if: (O,[bool,instr])=> 'if ('+C.boolean(O,bool)+'){'+F.instruction(O,instr)+'} ',
    ifelse: (O,[bool,alt1,alt2])=> "if (" + C.boolean(O,bool) + "){" + F.instruction(O,alt1) + "} else {" + F.instruction(O,alt2) + "}",
    ifplayer: (O,[plr,instr])=> plr === O.player ? F.instruction(O,instr) : '',
    playercase: (O,[alt1,alt2])=> F.instruction(O,O.player === 1 ? alt1 : alt2),
    all: (O,[defs])=> defs.map(d=>F.instruction(O,d)).join(' ')
};


const F = {
    instruction: (O,def)=> { // TODO - add in linktoendturn
        if (instructionTypes[def[0]]) {
            return instructionTypes[def[0]](O,_.tail(def));
        } else if (O && O.effect){ // TODO - need this check? fix through other means?
            return E.applyeffect(O,def)
        } else if (O && O.generating && O.rules && O.rules.generators[def]){
            return G.applyGenerator(O,O.rules.generators[def])
        } else {
            throw "Unknown instruction def: "+def;
        }
    },
    applyEffectInstructions: (O,instr)=> {
        O = {effect:true, ...(O || {})}
        if (instr.applyEffect) {
            return F.instruction(O,instr.applyEffect)
        } else if (instr.applyEffects) {
            return F.instruction(O,['all'].concat(instr.applyEffects))
        } else {
            return '';
        }
    },
    applyGeneratorInstructions: (O,instr)=> {
        O = {generating:true, ...(O || {})}
        if (instr.runGenerator) {
            return F.instruction(O,instr.runGenerator)
        } else if (instr.runGenerators) {
            return F.instruction(O,['all'].concat(instr.runGenerators))
        } else {
            return '';
        }
    },
    linkToEndturn: (O)=> {
        let ret = F.applyGeneratorInstructions({generating:true, ...(O || {})},O.rules.endturn || {})
        return ret + _.map(O.rules.endturn && O.rules.endturn.unless,(cond,name)=> {
            return 'if ('+C.boolean(O,cond)+'){ blockedby = "'+name+'"; } '
        }).concat(_.map(O.rules.endgame,(def,name)=> { // TODO - perhaps perffix below?
            return `
                if (${C.boolean(O,def.condition)}) { 
                    var winner = ${C.value(O,def.who||['currentplayer'])};
                    links.endturn = winner === ${O.player} ? 'win' : winner ? 'lose' : 'draw';
                    links.gameendby = '${name}';
                }`;
        })).concat('links.endturn = "next"; ').join(' else ')
    },

    // assumes markname, markpos, stepid
    // mutates MARKS, removemarks, newid
    addMark: (O)=> {
        let ret = ''
        ret += 'MARKS[markname] = markpos; '
        if (!(O && O.AI)){
            ret += 'removemarks = Object.assign({},removemarks); '
            ret += 'removemarks[markname] = stepid; '
        }
        ret += 'newid = stepid+= "-"+markpos; '
        return ret;
    },

    // assumes unpacked data
    applyMarkConsequences: (O)=> {
        // add mark
        // copy & augment removemarks // if human
        // copy undo // if human
        // run generators
        // link
    }

}

export default F





