import uniq from "lodash/array/uniq"
import reduce from "lodash/collection/reduce"
import invert from "lodash/object/invert"

import U from '../utils'

const colnametonumber = reduce("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(""),(mem,char,n)=> {
    mem[char] = n+1;
    return mem;
},{});

const colnumbertoname = invert(colnametonumber)


export default C => Object.assign(C,{

    pos2coords: (O,pos)=> JSON.stringify({
        x: colnametonumber[pos[0]],
        y: parseInt(pos.substr(1))
    }),

    coords2pos: (O,coords)=> "'"+colnumbertoname[coords.x]+coords.y+"'",


    // assumes UNITDATA, cleanunitslate, ownernames
    // mutates UNITLAYERS
    calculateUnitLayers: (O)=> {
        let ret =  'UNITLAYERS = '+C.blankArtifactLayers(O) + '; '
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
    },


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
    },{}))

})





