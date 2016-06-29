import _ from 'lodash'
import U from './utils'


const P = {

	/*
	Calculates the connections object
	*/
	boardconnections: (board)=> {
		let ret = {}
		for (var x=1;x<=board.width;x++){
			for(var y=1;y<=board.height;y++){
				let pos = U.coords2pos({x,y})
				ret[pos] = U.posConnections(pos,board)
			}
		}
		return ret
	},

	deduceInitialUnitData: (setup)=> {
		var id = 1;
		return _.reduce(setup,(mem,defsbyplr,group)=> {
			return _.reduce(defsbyplr,(mem,entitydefs,plr)=> {
				return _.reduce( entitydefs, (mem,entitydef)=> {
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
		},{})
	},

	/*
	Should be called with the result from deduceTerrainLayers and a full board
	Will augment terrain with 'no<terrainname>' layers
	*/
	addNegationsToTerrain: (terrain,board)=> _.reduce(terrain,(mem,t,name)=>{
		mem['no'+name] = {}
		for(var pos in board){
			if (!t[pos]){
				mem['no'+name][pos] = {}
			}
		}
		return mem
	},terrain),

	deduceTerrainLayers: (terrain,plr)=> _.reduce(terrain,(mem,def,name)=> {
		mem[name] = {};
		if (_.isArray(def)){ // no ownership
			_.flatten(def.map(U.convertToEntities)).forEach(e=>{
				mem[name][e.pos] = e;
			})
		} else { // per-player object
			for(var owner in def){
				owner = parseInt(owner)
				_.flatten(def[owner].map(U.convertToEntities)).forEach(e=>{
					e.owner = owner
					mem[name][e.pos] = e
					let prefix = owner === 0 ? 'neutral' : owner === plr ? 'my' : 'opp'
					mem[prefix+name] = mem[prefix+name] || {}
					mem[prefix+name][e.pos] = e
				})
			}
		}
		return mem;
	},{}),

	/*
	Parses gamedef to find all possible unit layers by looking at setup and dynamically created units
	Returns an array of all possible layers
	*/
	deduceUnitLayers: (gamedef)=> _.uniq(Object.keys(gamedef.setup || {}).concat(P.deduceDynamicGroups(gamedef.commands))).reduce(
		(list,g) => list.concat([g,"my"+g,"opp"+g,"neutral"+g]), []
	).sort(),

	/*
	Parses command data to find all potential groups created by commands like spawn.
	Used in deduceUnitLayers
	*/
	deduceDynamicGroups: (data)=> _.uniq(
		data[0] === "spawn" ? U.possibilities(data[2])
		: {setat:1,setid:1,setin:1}[data[0]] && U.contains(U.possibilities(data[2]),'group') ? U.possibilities(data[3])
		: _.isArray(data) || _.isObject(data) ? _.reduce(data,(mem,def)=>mem.concat(P.deduceDynamicGroups(def)),[])
		: []
	).sort(),


}

export default P