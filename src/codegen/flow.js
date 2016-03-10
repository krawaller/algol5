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
    instruction: (O,def)=> {
        if (instructionTypes[def[0]]) {
            return instructionTypes[def[0]](O,_.tail(def));
        } else if (O && O.effect){
            return E.applyeffect(O,def)
        } else if (O && O.generators && O.generators[def]){
            return G.applyGenerator(O,O.generators[def])
        } else {
            throw "Unknown instruction def: "+def;
        }
    },
    endgame: (O,gamedef)=> _.reduce(gamedef.endgame,(ret,def,name)=>
        ret + C.boolean(O,def.condition)+' ? ["'+name+'",'+C.value(O,def.who||['currentplayer'])+'] : '
    ,'') + ' undefined ',
    preventendturn: (O,gamedef)=> _.reduce(gamedef.unless,(ret,cond,name)=>
        ret + C.boolean(O,cond)+' ? "'+name+'" : '
    ,'') + ' undefined ',
}

export default F