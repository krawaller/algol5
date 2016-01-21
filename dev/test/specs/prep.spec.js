import P from '../../../src/prep'
import test from '../libtester'

test("the prep funcs",P,{
	"addfromdef(world,layers,def)": {
		"for straight pos": {
			world: {layer1:{},layer2:{a1:['foo']}},
			layers: ["layer1","layer2"],
			def: 'a1',
			expected: {layer1:{a1:[{pos:'a1'}]},layer2:{a1:['foo',{pos:'a1'}]}}
		},
		"for straight obj": {
			world: {layer:{}},
			layers: ["layer"],
			def: {pos:'a1',foo:'bar'},
			expected: {layer:{a1:[{pos:'a1',foo:'bar'}]}}
		}
	},
	"boardlayers(board)": {
		"for normal call": {
			board: {height:2,width:2},
			expected: {
				board: {
					a1:[{pos:'a1',x:1,y:1,colour:'dark'}],
					a2:[{pos:'a2',x:1,y:2,colour:'light'}],
					b1:[{pos:'b1',x:2,y:1,colour:'light'}],
					b2:[{pos:'b2',x:2,y:2,colour:'dark'}]
				},
				light: {
					a2:[{pos:'a2',x:1,y:2,colour:'light'}],
					b1:[{pos:'b1',x:2,y:1,colour:'light'}]
				},
				dark: {
					a1:[{pos:'a1',x:1,y:1,colour:'dark'}],
					b2:[{pos:'b2',x:2,y:2,colour:'dark'}]
				}
			}
		}
	},
	"boardconnections(board)": {
		"for normal call": {
			board: {height:2,width:2},
			expected: {
				a1:{1:'a2',2:'b2',3:'b1'},
				a2:{3:'b2',4:'b1',5:'a1'},
				b1:{7:'a1',8:'a2',1:'b2'},
				b2:{5:'b1',6:'a1',7:'a2'}
			}
		}
	},
	"posconnections(pos,board)": {
		"for normal call": {
			pos: 'a1',
			board: {height:2,width:2},
			expected: {1:'a2',2:'b2',3:'b1'}
		},
		"with offsets": {
			pos: 'a1',
			board: {height:2,width:3,offsets:[[1,2],[0,2]]},
			expected: {1:'a2',2:'b2',3:'b1',o1_1_2:'c2',o1_0_2:'c1'}
		}
	},
	"coordstopos(coords)": {
		"for normal call": {
			coords: {x:2,y:4},
			expected: 'b4'
		},
		"for another normal call": {
			coords: {x:5,y:1},
			expected: 'e1'
		}
	},
	"postocoords(pos)": {
		"for normal call": {
			pos: 'b4',
			expected: {x:2,y:4}
		},
		"for another normal call": {
			pos: 'e1',
			expected: {x:5,y:1}
		}
	},
	"offsetpos(pos,dir,forward,right,board)": {
		"for call to existing square": {
			pos: 'a1',
			dir: 1,
			forward: 1,
			right: 2,
			board: {height:2,width:3},
			expected: 'c2'
		},
		"for call to non-existing square": {
			pos: 'a1',
			dir: 1,
			forward: 3,
			right: 1,
			board: {height:2,width:3},
			expected: false
		},
	}
})
