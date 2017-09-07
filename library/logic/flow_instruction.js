import * as tail from "lodash/tail"
import * as map from "lodash/map"

export default C => Object.assign(C,{

    instruction: (O,def)=> {
        if (C['instr_'+def[0]]) {
            return C['instr_'+def[0]](O,tail(def));
        } else if (O && O.effect){
            return C.applyeffect(O,def)
        } else if (O && O.generating && O.rules && O.rules.generators[def]){
            return C.applyGenerator(O,O.rules.generators[def])
        } else if (O && O.linking) {
            return C.applyLink(O,def)
        } else {
            throw "Unknown instruction def: "+def;
        }
    },

    instr_if: (O,[bool,instr])=> 'if ('+C.boolean(O,bool)+'){'+C.instruction(O,instr)+'} ',
    instr_ifelse: (O,[bool,alt1,alt2])=> "if (" + C.boolean(O,bool) + "){" + C.instruction(O,alt1) + "} else {" + C.instruction(O,alt2) + "}",
    instr_ifplayer: (O,[plr,instr])=> plr === O.player ? C.instruction(O,instr) : '',
    instr_playercase: (O,[alt1,alt2])=> C.instruction(O,O.player === 1 ? alt1 : alt2),
    instr_all: (O,defs)=> defs.map(d=>C.instruction(O,d)).join(' '),

    applyGeneratorInstructions: (O,instr)=> {
        O = {generating:true, ...(O || {})}
        if (instr.runGenerator) {
            return C.instruction(O,instr.runGenerator)
        } else if (instr.runGenerators) {
            return C.instruction(O,['all'].concat(instr.runGenerators))
        } else {
            return '';
        }
    }

})





