import reduce from "lodash/reduce"
import flatten from "lodash/flatten"
import isArray from "lodash/isArray"

export default C => Object.assign(C,{

    // assumes step
    copyArtifactsForAction: (O,actiondef)=> {
        let actionlayers = C.actionLayers(O,actiondef)
        let ret = '{'
        ret += actionlayers.map(l=>l+': Object.assign({},step.ARTIFACTS.'+l+')').join(', ')
        ret += '}'
        if (actionlayers.length === Object.keys(C.blankArtifactLayers(O,true)).length){
            return ret;
        } else {
            return 'Object.assign({},step.ARTIFACTS,'+ret+')'
        }
    },

    isTerrainNeutral: O=> !Object.keys(C.getTerrain(O))
        .filter(t=> t[1] || t[2]).length,

    // assumes UNITDATA, ownernames
    // mutates UNITLAYERS
    calculateUnitLayers: (O)=> `
        ${O && O.defineUnitlayers ? 'var ' : ''}UNITLAYERS = ${C.blankUnitLayers(O)};
        for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos]
                = UNITLAYERS[unitgroup][unitpos]
                = UNITLAYERS[owner + unitgroup][unitpos]
                = UNITLAYERS[owner +'units'][unitpos]
                = currentunit;
        }`,

    /*
    Calculate blank unit layers yada yada
    */
    blankUnitLayers: (O,pure)=> {
        let ret = reduce(
            Object.keys(O && O.rules && O.rules.setup || {}).concat(C.deduceDynamicGroups(O && O.rules && O.rules.commands || {})).concat('units'),
            (mem,g)=>({ ...mem, [g]: {}, ['my'+g]: {}, ['opp'+g]: {}, ['neutral'+g]: {} }),
            {}
        )
        return pure ? ret : JSON.stringify(ret)
    },

    /*
    Calculates all possible artifact layers used in the game
    */
    blankArtifactLayers: (O,pure)=> {
        let ret = reduce(O && O.rules && O.rules.generators||{},(mem,gendef,key)=>{
            return Object.assign(mem,C.generatorLayers(gendef));
        },{})
        return pure ? ret : JSON.stringify(ret)
    },

    isTerrainLayerRef: (O, name)=> {
        let names = Object.keys(C.getTerrain(O));
        let variants = names.reduce((mem, n) => {
            ['my','opp','neutral','no'].forEach(prefix => {
                if (C.contains(O.rules,prefix+n)){
                    mem.push(prefix+n);
                }
            });
            return mem;
        }, []);
        return names.concat(variants).indexOf(name) !== -1;
    }
})

