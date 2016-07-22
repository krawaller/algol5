import reduce from "lodash/collection/reduce"
import flatten from "lodash/array/flatten"
import isArray from "lodash/lang/isArray"

import U from '../utils'

export default C => Object.assign(C,{

    /*
    Calculates the connections object
    */
    boardConnections: (O)=> JSON.stringify(reduce(
        U.boardPositions(O.rules.board),
        (ret,pos)=> ({...ret, [pos]:U.posConnections(pos,O.rules.board)}),
        {}
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
            UNITLAYERS.all[unitpos]
                = UNITLAYERS[unitgroup][unitpos]
                = UNITLAYERS[owner + unitgroup][unitpos]
                = UNITLAYERS[owner +'units'][unitpos]
                = currentunit
        }`,

    /*
    Calculate blank unit layers yada yada
    */
    blankUnitLayers: (O)=> JSON.stringify(reduce(
        Object.keys(O.rules.setup || {}).concat(U.deduceDynamicGroups(O.rules.commands)),
        (mem,g)=>({ ...mem, [g]: {}, ['my'+g]: {}, ['opp'+g]: {}, ['neutral'+g]: {} }),
        {}
    )),

    /*
    the initial unit data blob
    */
    deduceInitialUnitData: (O)=> {
        var id = 1;
        return JSON.stringify(reduce(O.rules.setup,(mem,defsbyplr,group)=> {
            return reduce(defsbyplr,(mem,entitydefs,plr)=> {
                return reduce( entitydefs, (mem,entitydef)=> {
                    U.convertToEntities(entitydef).forEach(e=> {
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
    blankArtifactLayers: (O)=> JSON.stringify(reduce(O.rules.generators,(mem,gendef,key)=>{
        return reduce(gendef.draw,(mem2,drawdef)=> {
            return reduce(U.possibilities(drawdef.tolayer),(mem3,l)=> {
                const list = drawdef.include && drawdef.include.hasOwnProperty("owner") ? [l,"my"+l,"opp"+l,"neutral"+l] : [l]
                return reduce(list, (mem4,l)=> ({...mem4, [l]:{} }), mem3)
            },mem2)
        },mem)
    },{})),

    /*
    Calculates the three BOARD layers (board,light,dark) and returns them.
    These are the same for every player.
    */
    boardLayers: (O)=> JSON.stringify(reduce(U.boardPositions(O.rules.board),(mem,pos)=> {
        let {x,y} = U.pos2coords(pos),
            colour = ["dark","light"][(x+(y%2))%2]
        mem.board[pos] = mem[colour][pos] = {colour,pos,x,y}
        return mem
    },{board:{},light:{},dark:{}})),

    /*
    Calculates all terrain layers and returns them. 
    This should be done per player if any terrain has owner.
    */
    terrainLayers: (O,forplr)=> {
        let terrain = reduce(O.rules.board.terrain,(mem,def,name)=> {
            mem[name] = {};
            if (isArray(def)){ // no ownership
                flatten(def.map(U.convertToEntities)).forEach(e=>{
                    mem[name][e.pos] = e;
                })
            } else { // per-player object
                for(var owner in def){
                    owner = parseInt(owner)
                    flatten(def[owner].map(U.convertToEntities)).forEach(e=>{
                        e.owner = owner
                        mem[name][e.pos] = e
                        let prefix = owner === 0 ? 'neutral' : owner === forplr ? 'my' : 'opp'
                        mem[prefix+name] = mem[prefix+name] || {}
                        mem[prefix+name][e.pos] = e
                    })
                }
            }
            return mem;
        },{})

        return JSON.stringify(reduce(terrain,(mem,t,name)=> {
            let noname = 'no'+name
            if (U.contains(O.rules,noname)){
                mem['no'+name] = {}
                U.boardPositions(O.rules.board).forEach( pos => {
                    if (!t[pos]){
                        mem['no'+name][pos] = {pos:pos}
                    }
                })
            }
            return mem
        },terrain))
    }
})

