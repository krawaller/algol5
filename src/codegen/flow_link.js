import map from "lodash/collection/map"

export default C => Object.assign(C,{

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
    }

})





