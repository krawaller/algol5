import map from "lodash/collection/map"

export default C => Object.assign(C,{

    // Assumes ....
    linkToEndturn(O) {
        let ret = C.applyGeneratorInstructions({generating:true, ...(O || {})},O.rules.endturn || {})
        return ret + map(O.rules.endturn && O.rules.endturn.unless,(cond,name)=> {
            return 'if ('+C.boolean(O,cond)+'){ blockedby = "'+name+'"; } '
        }).concat(map(O.rules.endgame,(def,name)=> { // TODO - perhaps perffix below?
            return `
                if (${C.boolean(O,def.condition)}) { 
                    var winner = ${C.value(O,def.who||['currentplayer'])}; // TODO - rather read plr from object?
                    links.endturn = winner === ${O.player} ? 'win' : winner ? 'lose' : 'draw';
                    links.gameendby = '${name}';
                }`;
        })).concat('links.endturn = "next"; ').join(' else ')
    },

    applyLink(O,name,pos) {
        if (O.rules && O.rules.commands & O.rules.commands[name]){
            return `
            
            `
        } else if (O.rules && O.rules.marks & O.rules.marks[name]){
            
        } else if (name === "endturn"){
 
        } else {
            throw "Unknown link: "+name
        }
    },

})





