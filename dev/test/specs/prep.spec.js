import P from '../../../src/prep'

describe('the prep funcs',()=>{
	describe('the coordstopos func',()=>{
		let p2c = P.coordstopos
		it('should return expected values',()=>{
			expect(p2c({x:2,y:4})).toEqual('b4')
			expect(p2c({x:5,y:1})).toEqual('e1')
		});
	})
	describe('the postocoords func',()=>{
		let c2p = P.postocoords
		it('should return expected values',()=>{
			expect(c2p('a2')).toEqual({x:1,y:2})
			expect(c2p('e4')).toEqual({x:5,y:4})
		})
	})
	describe('the offsetpos func',()=>{
		let off = P.offsetpos, // (pos,dir,forward,right,board)
			board = {height:2,width:3}
		it('should return expected values',()=>{
			expect(off('a1',1,1,2,board)).toEqual('c2')
			expect(off('a1',8,1,2,board)).toEqual(false)
		})
	})
})