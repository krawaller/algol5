import _ from "lodash";
import C from "./core";

const F = {
    endgame: (O,gamedef)=> _.reduce(gamedef.endgame,(ret,def,name)=>
        ret + C.boolean(O,def.condition)+' ? ["'+name+'",'+C.value(O,def.who||['currentplayer'])+'] : '
    ,'') + ' undefined ',
    preventendturn: (O,gamedef)=> _.reduce(gamedef.unless,(ret,cond,name)=>
        ret + C.boolean(O,cond)+' ? "'+name+'" : '
    ,'') + ' undefined ',
}

export default F