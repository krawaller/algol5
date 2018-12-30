import { GameTestSuite } from '../types';

const snijpuntTests: GameTestSuite = {
  basic: [
    [[],["b6", "c6", "d6", "e6", "f6"]],
    [["d6","snipe","endturn"],["a1", "a2", "a3", "a4", "a5"]],
    [["a3","snipe","endturn"],["b6", "c6", "e6", "f6"]],
    [["c6","snipe","endturn"],["a1", "a2", "a4", "a5"]],
    [["a4","snipe","endturn"],["b6", "d6", "e6", "f6"]],
    [["d6","snipe","endturn"],["a1", "a2", "a5"]],
    [["a2","snipe","endturn"],["b6", "c6", "e6", "f6"]],
    [["c6","snipe","endturn"],["a1", "a5"]],
    [["a5","snipe","endturn"],["b6", "d6", "e6", "f6"]],
    [["d6","snipe","endturn"],["a1"]],
    [["a1","snipe","endturn"],["b6", "c6", "e6", "f6"]],
    [["c6","snipe","endturn"],["a2", "a3", "a4", "a5"]]
  ]
};

export default snijpuntTests;
