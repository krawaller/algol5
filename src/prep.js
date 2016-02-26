import _ from 'lodash'
import U from './utils'

const colnametonumber = _.reduce("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(""),(mem,char,n)=> {
	mem[char] = n+1;
	return mem;
},{});

const colnumbertoname = _.invert(colnametonumber)

const P = {
	boardlayers: (board)=> {
		let ret = {board:{},light:{},dark:{}}
		for (var x=1;x<=board.width;x++){
			for(var y=1;y<=board.height;y++){
				let pos = P.coordstopos({x,y}),
					colour = ["dark","light"][(x+(y%2))%2],
					obj = {colour,pos,x,y}
				ret.board[pos] = obj
				ret[colour][pos] = obj
			}
		}
		return ret
	},
	boardconnections: (board)=> {
		let ret = {}
		for (var x=1;x<=board.width;x++){
			for(var y=1;y<=board.height;y++){
				let pos = P.coordstopos({x,y})
				ret[pos] = P.posconnections(pos,board)
			}
		}
		return ret
	},
	posconnections: (pos,board)=> { // TODO - use to generate all
		return [1,2,3,4,5,6,7,8].reduce((mem,dir)=>{
			let newpos = P.offsetpos(pos,dir,1,0,board)
			if (newpos){
				mem[dir] = newpos
			}
			return (board.offsets||[]).reduce((innermem,[forward,right])=>{
				let newpos = P.offsetpos(pos,dir,forward,right,board)
				if (newpos){
					innermem['o'+dir+'_'+forward+'_'+right] = newpos
				}
				return innermem;
			},mem);
		},{})
	},
	postocoords: (pos)=> ({
		x: colnametonumber[pos[0]],
		y: parseInt(pos.substr(1))
	}),
	coordstopos: (coords)=> colnumbertoname[coords.x]+coords.y,
	offsetpos: (pos,dir,forward,right,board)=> {
		let forwardmods = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]], // x,y
			rightmods =   [[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1]],
			n = dir-1,
			coords = P.postocoords(pos),
			newx = coords.x + forwardmods[n][0]*forward + rightmods[n][0]*right,
			newy = coords.y + forwardmods[n][1]*forward + rightmods[n][1]*right,
			withinbounds =  newx>0 && newx<=board.width && newy>0 && newy<=board.height;
		return withinbounds && P.coordstopos({x:newx,y:newy})
	},
	addfromdef: (world,layers,def)=> {
		let obj, pos
		switch(def[0]){
			case "pos": // ["pos",list,blueprint]
				return def[1].reduce((mem,pos)=>P.addfromdef(mem,layers,Object.assign({pos},def[2]||{})),world)
			case "rect": // ["rect",bottomleft,topright,blueprint]
			case "holerect": // ["holerect",bottomleft,topright,holes,blueprint]
				let bottomleft = P.postocoords(def[1]),
					topright = P.postocoords(def[2]),
					blueprint = def[3]
				let positions = _.reduce(_.range(bottomleft.y,topright.y+1),(mem,y)=>{
					return _.reduce(_.range(bottomleft.x,topright.x+1),(innermem,x)=>{
						return innermem.concat(P.coordstopos({x,y}))
					},mem)
				},[])
				if (def[0]==="holerect"){
					blueprint = def[4]
					positions = _.filter(positions,p=>_.indexOf(def[3],p)===-1)
				}
				return P.addfromdef(world,layers,["pos",positions,blueprint])
			default: 
				if (_.isString(def)){
					obj = {pos:def}
				} else if (_.isObject(def)){
					obj = def
				} else {
					throw "Unknown def: "+def
				}
		}
		layers.forEach(layer=>{
			world[layer][obj.pos] = obj; // (world[layer][obj.pos]||[]).concat(obj)
		})
		return world
	},

	/*
	Parses gamedef to find all possible unit layers by looking at setup and dynamically created units
	*/
	deduceUnitLayers: (gamedef)=> _.uniq(Object.keys(gamedef.setup || {}).concat(P.deduceDynamicGroups(gamedef.commands))).reduce(
		(list,g) => list.concat([g,"my"+g,"opp"+g,"neutral"+g,"mydead"+g,"oppdead"+g,"neutraldead"+g,"dead"+g]), []
	).sort(),

	/*
	Parses command data to find all potential groups created by commands like spawn
	Used in deduceUnitLayers
	*/
	deduceDynamicGroups: (data)=> (
		data[0] === "spawn" ? U.possibilities(data[2])
		: data[0] === "setat" && U.contains(U.possibilities(data[2]),'group') ? U.possibilities(data[3])
		: data[0] === "setid" && U.contains(U.possibilities(data[2]),'group') ? U.possibilities(data[3])
		: _.isArray(data) || _.isObject(data) ? _.reduce(data,(mem,def)=>mem.concat(P.deduceDynamicGroups(def)),[])
		: []
	).sort(),

	/*
	Calculates all possible artifact layers used in the game
	*/
	deduceArtifactLayers: (generators)=>
		_.uniq(_.reduce(generators,(mem,gendef)=>{
			return _.reduce(gendef.draw,(m,drawdef)=>{
				return _.reduce(U.possibilities(drawdef.tolayer),(m,l)=>{
					return m.concat( drawdef.include && drawdef.include.hasOwnProperty("owner") ? [l,"my"+l,"opp"+l,"neutral"+l] : l )
				},m)
			},mem)
		},[])).sort()

}

export default P