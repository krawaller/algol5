import P from '../../../src/prep'
import test from '../libtester'

test("the prep funcs",P,{
	"deduceInitialUnitData(setup)": {
		"it deduces unitData correctly": {
			setup: {
				muppets: {
					1: ["c1"],
					2: [["rect","a1","b2"]]
				}
			},
			expected: {
				unit1: {id:"unit1",owner:1,pos:"c1",group:"muppets"},
				unit2: {id:"unit2",owner:2,pos:"a1",group:"muppets"},
				unit3: {id:"unit3",owner:2,pos:"b1",group:"muppets"},
				unit4: {id:"unit4",owner:2,pos:"a2",group:"muppets"},
				unit5: {id:"unit5",owner:2,pos:"b2",group:"muppets"}
			}
		}
	},
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
	}
})
