import { GameTestSuite } from '../types';

const semaphorTests: GameTestSuite = {
  basic: [
    [[],["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3", "d1", "d2", "d3"]],
    [["c2"],["deploy"]],
    [["deploy","endturn"],["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3", "d1", "d2", "d3"]],
    [["c2"],["promote"]],
    [["promote","endturn","c2","promote","endturn"],["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c3", "d1", "d2", "d3"]],
    [["b2","deploy","endturn","b2","promote","endturn","b2","promote","endturn"],["a1", "a2", "a3", "b1", "b3", "c1", "c3", "d1", "d2", "d3"]],
    [["a2","deploy","endturn","a2","promote","endturn","a2","promote"],["win"]]
  ]
};

export default semaphorTests;
