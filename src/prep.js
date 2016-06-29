import _ from 'lodash'
import U from './utils'


const P = {

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
	},{})

}

export default P