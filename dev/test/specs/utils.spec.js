import U from '../../../src/utils'
import test from '../libtester'

test("the prep funcs",U,{
	"coords2pos(coords)": {
		"for normal call": {
			coords: {x:2,y:4},
			expected: 'b4'
		},
		"for another normal call": {
			coords: {x:5,y:1},
			expected: 'e1'
		}
	},
	"pos2coords(pos)": {
		"for normal call": {
			pos: 'b4',
			expected: {x:2,y:4}
		},
		"for another normal call": {
			pos: 'e1',
			expected: {x:5,y:1}
		}
	},
	"offsetPos(pos,dir,forward,right,board)": {
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
	},
	"posConnections(pos,board)": {
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
	"convertToEntities(def)": {
		"for straight pos": {
			def: 'a1',
			expected: [{pos:'a1'}]
		},
		"for straight obj": {
			def: {pos:'a1',foo:'bar'},
			expected: [{pos:'a1',foo:'bar'}]
		},
		"for poslist with no blueprint": {
			def: ["pos",["a1","b2"]],
			expected: [{pos:'a1'},{pos:'b2'}]
		},
		"for poslist with blueprint": {
			def: ["pos",["a1","b2"],{baz:'bin'}],
			expected: [{pos:'a1',baz:'bin'},{pos:'b2',baz:'bin'}]
		},
		"for rectangle with no blueprint": {
			def: ["rect","b1","c2"],
			expected: [{pos:'b1'},{pos:'c1'},{pos:'b2'},{pos:'c2'}]
		},
		"for rectangle with blueprint": {
			def: ["rect","b1","c2",{baz:'bin'}],
			expected: [{pos:'b1',baz:'bin'},{pos:'c1',baz:'bin'},{pos:'b2',baz:'bin'},{pos:'c2',baz:'bin'}]
		},
		"for holed rectangle with no blueprint": {
			def: ["holerect","b1","c2",["b2"]],
			expected: [{pos:'b1'},{pos:'c1'},{pos:'c2'}]
		},
		"for holed rectangle with blueprint": {
			def: ["holerect","b1","c2",["b2"],{baz:'bin'}],
			expected: [{pos:'b1',baz:'bin'},{pos:'c1',baz:'bin'},{pos:'c2',baz:'bin'}]
		}
	}
})
