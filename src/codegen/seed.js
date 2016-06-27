import uniq from "lodash/array/uniq"
import reduce from "lodash/collection/reduce"

import U from '../utils'

export default C => Object.assign(C,{

    // assumes UNITDATA, cleanunitslate, ownernames
    // mutates UNITLAYERS
    calculateUnitLayers: (O)=> {
        let ret =  'UNITLAYERS = Object.assign({},cleanunitslate); '
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
    deduceArtifactLayers: (O)=> JSON.stringify(reduce(O.rules.generators,(mem,gendef,key)=>{
        return reduce(gendef.draw,(mem2,drawdef)=> {
            return reduce(U.possibilities(drawdef.tolayer),(mem3,l)=> {
                const list = drawdef.include && drawdef.include.hasOwnProperty("owner") ? [l,"my"+l,"opp"+l,"neutral"+l] : [l]
                return reduce(list, (mem4,l)=> ({...mem4, [l]:{} }), mem3)
            },mem2)
        },mem)
    },{}))

})





