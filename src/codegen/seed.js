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
    deduceArtifactLayers: (O)=> JSON.stringify(uniq(reduce(O.rules.generators,(mem,gendef)=>{
        return reduce(gendef.draw,(m,drawdef)=>{
            return reduce(U.possibilities(drawdef.tolayer),(m,l)=>{
                return m.concat( drawdef.include && drawdef.include.hasOwnProperty("owner") ? [l,"my"+l,"opp"+l,"neutral"+l] : l )
            },m)
        },mem)
    },[])).sort())

})





