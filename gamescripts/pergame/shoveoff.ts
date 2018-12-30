import { GameTestSuite } from '../types';

const shoveoffTests: GameTestSuite = {
  basic: [
    [[],["a1", "a2", "a3", "a4", "b1", "b4", "c1", "c4", "d1", "d2", "d3", "d4"]],
    [["c1"],["north"]],
    [["north","endturn"], ["a1", "a2", "a3", "a4", "b1", "b4", "c1", "d1", "d2", "d3", "d4"]],
    [["d1"],["north", "west"]],
    [["west","endturn"],["a1", "a2", "a3", "a4", "b1", "b4", "c1", "c4", "d1", "d2", "d3", "d4"]],
    [["d4"],["west"]],
    [["west","endturn"],["a1", "a2", "a3", "a4", "b1", "c1", "c4", "d1", "d2", "d3", "d4"]],
    [["b1","north","endturn"],["a1", "a2", "a3", "a4", "b1", "c1", "c4", "d1", "d2", "d3", "d4"]],
    [["c4","south","endturn"],["a1", "a2", "a3", "a4", "b1", "b4", "c4", "d1", "d2", "d3", "d4"]],
    [["c4","south","endturn"],["a1", "a2", "a3", "a4", "b1", "c4", "d1", "d2", "d3", "d4"]],
    [["a1","north","win"],[]]
  ]
};

export default shoveoffTests;
