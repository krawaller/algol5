import uniq from "lodash/array/uniq"
import reduce from "lodash/collection/reduce"


import U from '../utils'




export default C => Object.assign(C,{

    // assumes UNITDATA, ownernames
    // mutates UNITLAYERS
    calculateUnitLayers: (O)=> `
        UNITLAYERS = ${C.blankArtifactLayers(O)};
        for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.all[unitpos]
                = UNITLAYERS[unitgroup][unitpos]
                = UNITLAYERS[owner + unitgroup][unitpos]
                = UNITLAYERS[owner +'units'][unitpos]
                = currentunit
        }`,

    /*
    Calculates all possible artifact layers used in the game
    */
    blankArtifactLayers: (O)=> JSON.stringify(reduce(O.rules.generators,(mem,gendef,key)=>{
        return reduce(gendef.draw,(mem2,drawdef)=> {
            return reduce(U.possibilities(drawdef.tolayer),(mem3,l)=> {
                const list = drawdef.include && drawdef.include.hasOwnProperty("owner") ? [l,"my"+l,"opp"+l,"neutral"+l] : [l]
                return reduce(list, (mem4,l)=> ({...mem4, [l]:{} }), mem3)
            },mem2)
        },mem)
    },{})),

    /*
    Calculates the three BOARD layers (board,light,dark) and returns them
    */
    boardLayers: (O,board)=> {
        let ret = {board:{},light:{},dark:{}}
        for (var x=1;x<=board.width;x++){
            for(var y=1;y<=board.height;y++){
                let pos = U.coords2pos({x,y}),
                    colour = ["dark","light"][(x+(y%2))%2],
                    obj = {colour,pos,x,y}
                ret.board[pos] = obj
                ret[colour][pos] = obj
            }
        }
        return JSON.stringify(ret)
    },

})





