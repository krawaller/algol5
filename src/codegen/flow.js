import _ from "lodash";
import C from "./core";

const F = {
    endgame: (O,gamedef)=> {
        let ret = 'var ending; ', n=0;
        _.each(gamedef.endgame,(def,name)=>{
            ret += (n++?' else ':'')+'if ('+C.boolean(O,def.condition)+'){'
            ret += 'ending=["'+name+'",'+C.value(O,def.who)+']; '
            ret += '}'
        });
        return ret;
    }
}

export default F