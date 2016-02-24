import test from '../gentester'
import lib from '../../../src/codegen/'

let G = lib.G

describe('the floater funcs',()=>{
	test(G.stopreason,'the stopreason func',{
		'should fail if already reached': {
			arg: {type:'floater'},
			scope: {
				REACHED: {'bar':5},
				POS: 'foo',
				DIR: 1,
				connections: {foo:{1:'bar'}},
				nextpos: ''
			},
			expected: 'alreadyreached'
		}
	})
	test(G.prepfloatfromstart, 'the prepfloatfromstart func', {
		'for simpel setup': {
			scope: {
				STARTPOS: 'start'
			},
			mutations: {
				FLOATFROM: {start:1},
				TOTALREACHED: 0,
				LASTLEVEL: 0,
				NEWREACHED: {},
				REACHED: {},
				LENGTH: 1
			}
		}
	});
	test(G.floatforth, 'the floatforth func', {
		'for simple float': {
			arg: {
				dir: 1
			},
			scope: {
				FLOATFROM: {a1:1,b1:1},
				REACHED: {},
				NEWREACHED: {},
				LASTLEVEL: 'whatev',
				TOTALREACHED: 2,
				LENGTH: 3,
				connections: {a1:{1:'a2'},b1:{1:'b2'},a2:{1:'a3'},a3:{},b2:{}}
			},
			mutations: {
				REACHED: {a2:3,b2:3,a3:4},
				TOTALREACHED: 5
			}
		}
	});
	test(G.floatexpansion, 'the floatexpansion func', {
		'for simple float': {
			arg: {
				dir: 1
			},
			scope: {
				FLOATFROM: {a1:1,b1:1},
				REACHED: {},
				NEWREACHED: {},
				LASTLEVEL: 'whatev',
				TOTALREACHED: 2,
				LENGTH: 3,
				connections: {a1:{1:'a2'},b1:{1:'b2'}}
			},
			mutations: {
				LASTLEVEL: 2,
				REACHED: {a2:3,b2:3},
				LENGTH: 4,
				TOTALREACHED: 4
			}
		}
	});
	test(G.floatfrompos, 'the floatindir func', {
		'when we have a dirlist': {
			arg: {
				type: 'floater',
				dirs: ['list',[1,2,3]]
			},
			scope: {
				LENGTH: 3,
				POS: 'a1',
				NEWREACHED: {},
				REACHED: {foo:'bar'},
				TOTALREACHED: 4,
				connections: {a1:{1:'a2',3:'a3'}}
			},
			mutations: {
				REACHED: {foo:'bar',a2:3,a3:3},
				NEWREACHED: {a2:3,a3:3},
				TOTALREACHED: 6
			}
		},
		'when we have a single dir': {
			arg: {
				type: 'floater',
				dir: 1
			},
			scope: {
				LENGTH: 3,
				POS: 'a1',
				NEWREACHED: {},
				REACHED: {foo:'bar'},
				TOTALREACHED: 4,
				connections: {a1:{1:'a2'}}
			},
			mutations: {
				REACHED: {foo:'bar',a2:3},
				NEWREACHED: {a2:3},
				TOTALREACHED: 5
			}
		}
	});
    test(G.floatindir, 'the floatindir func', {
    	'when we add a new square': {
    		arg: {
    			type: 'floater'
    		},
    		scope: {
    			LENGTH: 3,
    			DIR: 1,
    			POS: 'a1',
    			NEWREACHED: {},
    			REACHED: {foo:'bar'},
    			TOTALREACHED: 4,
    			connections: {a1:{1:'a2'}}
    		},
    		mutations: {
    			REACHED: {foo:'bar',a2:3},
    			NEWREACHED: {a2:3},
    			TOTALREACHED: 5
    		}
    	},
    	'when we hit a block which we want to record': {
    		arg: {
    			type: 'floater',
    			blocks: 'yes'
    		},
    		scope: {
    			BLOCKS: {a2:'weee'},
    			LENGTH: 3,
    			DIR: 1,
    			POS: 'a1',
    			NEWREACHED: {},
    			REACHED: {},
    			connections: {a1:{1:'a2'}},
    			BLOCKSREACHED: {}
    		},
    		mutations: {
    			NEWREACHED: {},
    			BLOCKSREACHED: {a2:3}
    		}
    	}
    });
});
