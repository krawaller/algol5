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
	},
	"deduceUnitLayers(game)": {
		"it deduces all layers correctly": {
			game: {
				setup: {
					kings: 'FOO',
					queens: 'BAR'
				},
				commands: {
					fart: {
						applyEffects: [
							['spawn','somepos',['playercase','jacks','aces']]
						]
					}
				}
			},
			expected: [
				'aces','jacks','kings','queens',
				'myaces','myjacks','mykings','myqueens',
				'neutralaces','neutraljacks','neutralkings','neutralqueens',
				'oppaces','oppjacks','oppkings','oppqueens',
			].sort()
		}
	},
	"deduceDynamicGroups(data)": {
		"it finds spawn groups": {
			data: ['BOGUS',['spawn','somepos',['playercase','group1','group2']]],
			expected: ['group1','group2']
		},
		"it finds setid groups": {
			data: {
				FOO:'BAR',
				EASY: ['setid','someid','group','group1'],
				HARD: ['setid','someid',['playercase','health','group'],['ifelse','somebool','group2','group3']],
				BOGUS: ['setid','someid',['playercase','what','ever'],['ifelse','somebool','alt3','alt4']]
			},
			expected: ['group1','group2','group3']
		},
		"it finds setat groups": {
			data: {
				FOO:'BAR',
				EASY: ['setat','someid','group','group1'],
				HARD: ['setat','someid',['playercase','health','group'],['ifelse','somebool','group2','group3']],
				BOGUS: ['setat','someid',['playercase','what','ever'],['ifelse','somebool','alt3','alt4']]
			},
			expected: ['group1','group2','group3']
		},
		"it finds setin groups": {
			data: {
				FOO:'BAR',
				EASY: ['setin','someset','group','group1'],
				HARD: ['setin','someset',['playercase','health','group'],['ifelse','somebool','group2','group3']],
				BOGUS: ['setin','someset',['playercase','what','ever'],['ifelse','somebool','alt3','alt4']]
			},
			expected: ['group1','group2','group3']
		},
	}

})
