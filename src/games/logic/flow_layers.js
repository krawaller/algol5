import reduce from "lodash/collection/reduce"
import flatten from "lodash/array/flatten"
import isArray from "lodash/lang/isArray"

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

    /*
    Calculates the connections object
    */
    boardConnections: (O)=> JSON.stringify(reduce(
        C.boardPositions(O.rules.board),
        (ret,pos)=> ({...ret, [pos]:C.posConnections(pos,O.rules.board)}),
        {faux:{}}
    )),

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
    the initial unit data blob
    */
    deduceInitialUnitData: (O)=> {
        var id = 1;
        return JSON.stringify(reduce(O.rules.setup,(mem,defsbyplr,group)=> {
            return reduce(defsbyplr,(mem,entitydefs,plr)=> {
                return reduce( entitydefs, (mem,entitydef)=> {
                    C.convertToEntities(entitydef).forEach(e=> {
                        let newid = 'unit'+(id++)
                        mem[newid] = Object.assign(e,{
                            id: newid,
                            group: group,
                            owner: parseInt(plr)
                        })
                    })
                    return mem
                },mem)
            },mem)
        },{}))
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

    /*
    Calculates the three BOARD layers (board,light,dark) and returns them.
    These are the same for every player.
    */
    boardLayers: (O)=> JSON.stringify(reduce(C.boardPositions(O.rules.board),(mem,pos)=> {
        let {x,y} = C.pos2coords(pos),
            colour = ["dark","light"][(x+(y%2))%2]
        mem.board[pos] = mem[colour][pos] = {colour,pos,x,y}
        return mem
    },{board:{},light:{},dark:{}})),

    /*
    Calculates all terrain layers and returns them. 
    This should be done per player if any terrain has owner.
    */
    terrainLayers: (O,pure)=> {
        if (!Object.keys(C.getTerrain(O)).length){
            return pure ? {} : JSON.stringify({})
        }
        let terrain = reduce(C.getTerrain(O),(mem,def,name)=> {
            mem[name] = {};
            if (isArray(def)){ // no ownership
                flatten(def.map(C.convertToEntities)).forEach(e=>{
                    mem[name][e.pos] = e;
                })
            } else { // per-player object
                for(var owner in def){
                    owner = parseInt(owner)
                    flatten(def[owner].map(C.convertToEntities)).forEach(e=>{
                        e.owner = owner
                        mem[name][e.pos] = e
                        let prefix = owner === 0 ? 'neutral' : owner === O.player ? 'my' : 'opp'
                        mem[prefix+name] = mem[prefix+name] || {}
                        mem[prefix+name][e.pos] = e
                    })
                }
            }
            return mem;
        },{})

        let ret = reduce(terrain,(mem,t,name)=> {
            let noname = 'no'+name
            if (C.contains(O.rules,noname)){
                mem['no'+name] = {}
                C.boardPositions(O.rules.board).forEach( pos => {
                    if (!t[pos]){
                        mem['no'+name][pos] = {pos:pos}
                    }
                })
            }
            return mem
        },terrain)

        return pure ? ret : JSON.stringify(ret)
    }
})

