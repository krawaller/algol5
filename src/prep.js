import _ from 'lodash'

const colnametonumber = _.reduce("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ".split(""),(mem,char,n)=> {
	mem[char] = n+1;
	return mem;
},{});

const colnumbertoname = _.invert(colnametonumber)

/*
Algol.prepareBoardLayersFromBoardDef = function(boarddef){
	var height = boarddef.get("height"), width = boarddef.get("width");
	return I.Range(1,width+1).reduce(function(mem,x){
		return I.Range(1,height+1).reduce(function(mem,y){
			var pos = this.posObjToName({x:x,y:y},boarddef), clr = ["dark","light"][(x+(y%2))%2], obj = I.Map({
				x: x, y: y, pos: pos, colour: clr
			})
			return mem.setIn(["board",pos],I.List([obj])).setIn([clr,pos],I.List([obj]));
		},mem,this);
	},I.Map(),this);
};
*/

const P = {
	boardlayers: (board)=> {
		let ret = {board:{},light:{},dark:{}}
		for (var x=1;x<=board.width;x++){
			for(var y=1;y<=board.height;y++){
				let pos = P.coordstopos({x,y}),
					colour = ["dark","light"][(x+(y%2))%2],
					obj = {colour,pos,x,y}
				ret.board[pos] = [obj]
				ret[colour][pos] = [obj]
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
	} 
}

export default P