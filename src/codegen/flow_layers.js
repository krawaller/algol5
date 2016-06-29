import uniq from "lodash/array/uniq"
import reduce from "lodash/collection/reduce"


import U from '../utils'

export default C => Object.assign(C,{

    /*
    Calculates the connections object
    */
    boardConnections: (O)=>
        JSON.stringify(reduce(U.boardPositions(O.rules.board),(ret,pos)=> ({...ret, [pos]:U.posConnections(pos,O.rules.board)}),{})),

    // assumes UNITDATA, ownernames
    // mutates UNITLAYERS
    calculateUnitLayers: (O)=> `
        UNITLAYERS = ${C.blankUnitLayers(O)};
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
    Calculates the three BOARD layers (board,light,dark) and returns them
    */
    boardLayers: (O)=> JSON.stringify(reduce(U.boardPositions(O.rules.board),(mem,pos)=> {
        let {x,y} = U.pos2coords(pos),
            colour = ["dark","light"][(x+(y%2))%2]
        mem.board[pos] = mem[colour][pos] = {colour,pos,x,y}
        return mem
    },{board:{},light:{},dark:{}}))
})





