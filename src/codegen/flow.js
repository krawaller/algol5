import tail from "lodash/array/tail"
import map from "lodash/collection/map"

import C from "./core";
import G from "./generate";
import E from "./effect";


const F = {

    // ******************** DATATYPE instruction **********************

    instruction: (O,def)=> { // TODO - add in linktoendturn
        if (F['instr_'+def[0]]) {
            return F['instr_'+def[0]](O,tail(def));
        } else if (O && O.effect){ // TODO - need this check? fix through other means?
            return E.applyeffect(O,def)
        } else if (O && O.generating && O.rules && O.rules.generators[def]){
            return G.applyGenerator(O,O.rules.generators[def])
        } else {
            throw "Unknown instruction def: "+def;
        }
    },

    instr_if: (O,[bool,instr])=> 'if ('+C.boolean(O,bool)+'){'+F.instruction(O,instr)+'} ',
    instr_ifelse: (O,[bool,alt1,alt2])=> "if (" + C.boolean(O,bool) + "){" + F.instruction(O,alt1) + "} else {" + F.instruction(O,alt2) + "}",
    instr_ifplayer: (O,[plr,instr])=> plr === O.player ? F.instruction(O,instr) : '',
    instr_playercase: (O,[alt1,alt2])=> F.instruction(O,O.player === 1 ? alt1 : alt2),
    instr_all: (O,[defs])=> defs.map(d=>F.instruction(O,d)).join(' '),

    // ******************** rest **********************

    applyEffectInstructions: (O,instr)=> {
        O = {effect:true, ...(O || {})}
        let copy = 'UNITDATA = Object.assign({},UNITDATA); '
        if (instr.applyEffect) {
            return copy+F.instruction(O,instr.applyEffect)
        } else if (instr.applyEffects) {
            return copy+F.instruction(O,['all'].concat(instr.applyEffects))
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

    // assumes markname, markpos, stepid
    // mutates MARKS, removemarks (but new ref), newid
    applyMarkConsequences: (O)=> {
        let ret = ''
        ret += 'MARKS[markname] = markpos; '
        if (!(O && O.AI)){
            ret += 'removemarks = Object.assign({},removemarks); '
            ret += 'removemarks[markname] = stepid; '
        }
        ret += 'newid = stepid+= "-"+markpos; '
        ret += 'path.push(markpos); '
        ret += F.applyGeneratorInstructions(O,O.rules.marks[O.markname]||{});

        /*
        
        (1) set mark, removemark (if human), newid & path
        (2) run generators

        */
        return ret;
    },

    // assumes cmndname, stepid, path, cleanartifactslate
    applyCommandConsequences: (O)=> {
        let ret = ''
        if (!(O && O.AI)){
            ret += 'var undo = stepid; '
        }
        ret += 'newid = stepid+"-"+cmndname; '
        ret += 'path.push(cmndname); '
        ret += F.applyEffectInstructions(O,O.rules.commands[O.cmndname]);
        ret += 'ARTIFACTS = cleanartifactslate; '
        ret += 'MARKS = {}; '
        ret += F.applyGeneratorInstructions(O,O.rules.commands[O.cmndname]);
        /*

        (1) set newid, path & undo (if human)
        (2) apply effects
        (3) clear artifacts & marks
        (4) apply generators

        clear removemarks // if human, in cleanup, not here
        */
        return ret;
    },

    // assumes UNITDATA, cleanunitslate, ownernames
    // mutates UNITLAYERS
    calculateUnitLayers: (O)=> {
        let ret =  'UNITLAYERS = Object.assign({},cleanunitslate); '
        ret += `
            for (var unitid in UNITDATA) {
                var currentunit = UNITDATA[unitid]
                var unitgroup = currentunit.group;
                var pos = currentunit.pos;
                var owner = ownernames[currentunit.owner]
                UNITLAYERS.all[pos]
                    = UNITLAYERS[unitgroup][pos]
                    = UNITLAYERS[owner + unitgroup][pos]
                    = UNITLAYERS[owner +'units'][pos]
                    = currentunit
            }
        `
        return ret
    }

}

export default F





