import P from '../../../src/prep'
import test from '../libtester'

test("the prep funcs",P,{

	"addNegationsToTerrain(terrain,board)": {
		"for normal call": {
			terrain: { west: { a: 'FOO' }, east: { c: 'BAR'} },
			board: { a: 'foo', b: 'bar', c: 'baz'},
			expected: {
				west: { a: 'FOO' },
				east: { c: 'BAR'},
				nowest: { b: {}, c: {} },
				noeast: { a: {}, b: {} }
			}
		}
	},
	"deduceTerrainLayers(terraindefs,plr)": {
		"it deduces correctly": {
			plr: 2,
			terraindefs: {
				holes: ["a1"],
				bunkers: {
					1: ["b1"],
					2: ["c1"],
					0: ["d1"]
				}
			},
			expected: {
				holes: {a1:{pos:'a1'}},
				bunkers: {
					b1: {pos:'b1',owner:1},
					c1: {pos:'c1',owner:2},
					d1: {pos:'d1',owner:0}
				},
				mybunkers: { c1: {pos:'c1',owner:2} },
				oppbunkers: { b1: {pos:'b1',owner:1} },
				neutralbunkers: { d1: {pos:'d1',owner:0} }
			}
		}
	}
})
