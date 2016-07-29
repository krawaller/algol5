import map from "lodash/collection/map"

export default C => Object.assign(C,{

    // Assumes ....
    linkToEndturn(O) {
        let ret = C.applyGeneratorInstructions({...(O || {}), generating:true},O.rules.endturn || {})
        return ret + map(O.rules.endturn && O.rules.endturn.unless,(cond,name)=> {
            return 'if ('+C.boolean(O,cond)+'){ blockedby = "'+name+'"; } '
        }).concat(map(O.rules.endgame,(def,name)=> `
            if (${C.boolean(O,def.condition)}) { 
                var winner = ${C.value(O,def.who||O.player)};
                links.endturn = winner === ${O.player} ? 'win' : winner ? 'lose' : 'draw';
                links.gameendby = '${name}';
            }`
        )).concat('links.endturn = "next"; ').join(' else ')
    },

    applyLink(O,name,pos) {
        if (O.rules && O.rules.commands & O.rules.commands[name]){
            return C.linkToCommand(O,name);
        } else if (O.rules && O.rules.marks & O.rules.marks[name]){
            return C.linkToMark(O,name);
        } else if (name === "endturn"){
            return C.linkToEndTurn(O);
        } else {
            throw "Unknown link: "+name
        }
    },

    linkToMark: (O,name)=> `
        var linkedpositions = Object.keys(MARKS.${name});
        var nbrofpositions = positions.length;
        for(var linknbr = 0; linknbr < nbrofpositions; linknbr++){
            turn[newstepid][linkedpositions[linknbr]] = '${name+O.player}';
        }
    `,

    linkToCommand: (O,name)=> `
        turn[newstepid].${name} = '${name+O.player}';
    `,

})





