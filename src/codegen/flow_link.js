import map from "lodash/collection/map"

export default C => Object.assign(C,{

    linkToEndturn(O) {
        let ret = C.applyGeneratorInstructions({...(O || {}), generating:true},O.rules.endturn || {})
        return ret + map(O.rules.endturn && O.rules.endturn.unless,(cond,name)=> {
            return 'if ('+C.boolean(O,cond)+'){ turn.blockedby = "'+name+'"; } '
        }).concat(map(O.rules.endgame,(def,name)=> `
            if (${C.boolean(O,def.condition)}) { 
                var winner = ${C.value(O,def.who||O.player)};
                var result = winner === ${O.player} ? 'win' : winner ? 'lose' : 'draw';
                turn.links[newstepid][result] = '${name}';
            }`
        )).concat('turn.links[newstepid].endturn = "start"+otherplayer; ').join(' else ')
    },

    applyLink(O,name) {
        if (O.rules && O.rules.commands && O.rules.commands[name]){
            return C.linkToCommand(O,name);
        } else if (O.rules && O.rules.marks && O.rules.marks[name]){
            return C.linkToMark(O,name);
        } else if (name === "endturn"){
            return C.linkToEndturn(O);
        } else {
            throw "Unknown link: "+name
        }
    },

    linkToMark: (O,name)=> `
        var linkedpositions = Object.keys(${C.set(O,O.rules.marks[name].from)});
        var nbrofpositions = linkedpositions.length;
        for(var linknbr = 0; linknbr < nbrofpositions; linknbr++){
            turn.links${O.root ? '.root' : '[newstepid]'}[linkedpositions[linknbr]] = '${name+O.player}';
        }
    `,

    linkToCommand: (O,name)=> `
        turn.links${O.root ? '.root' : '[newstepid]'}.${name} = '${name+O.player}';
    `,

})





