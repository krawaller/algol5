import { GameTestSuite } from '../types';

const castleTests: GameTestSuite = {
  basic: [
    [[],["c8", "f1", "h2", "h6", "l2", "l6", "n1", "q8"]],
    [["c8"],["b8", "c2", "c3", "c4", "c5", "c6", "c7", "c9", "d8", "e8", "f8", "g8", "h8", "i8"]],
    [["c9","move","endturn"],["c12", "f19", "h14", "h18", "l14", "l18", "n19", "q12"]],
    [["q12"],["k12", "l12", "m12", "n12", "o12", "p12", "q11", "q13", "q14", "q15", "q16", "q17", "q18", "r12"]],
    [["q11","move","endturn"],["c9", "f1", "h2", "h6", "l2", "l6", "n1", "q8"]],
    [["c9"],["a9", "b9", "c10", "c11", "c8", "d9", "e9", "f9", "g9", "h9", "i9", "j9", "k9", "l9", "m9", "n9", "o9", "p9", "q9", "r9", "s9"]]
  ]
};

export default castleTests;
