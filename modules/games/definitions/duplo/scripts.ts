import {GameTestSuite} from '../../../types';

const duploTests: GameTestSuite = {
  basic: [{
    commands: [],
    include: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"]
  }, {
    commands: ["c3", "deploy"],
    include: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "c1", "c2", "c4", "c5", "c6", "c7", "c8", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"]
  }, {
    commands: ["d4", "deploy", "endturn"],
    include: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "c1", "c2", "c4", "c5", "c6", "c7", "c8", "d1", "d2", "d3", "d5", "d6", "d7", "d8", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"]
  }, {
    commands: ["f6", "deploy", "g7", "deploy", "endturn"],
    include: ["c3", "d4"]
  }, {
    commands: ["d4"],
    include: ["c4", "c5", "d3", "d5", "e3", "e4"]
  }, {
    commands: ["d5", "expand", "endturn"],
    include: ["f6", "g7"]
  }, {
    commands: ["f6"],
    include: ["e6", "e7", "f5", "f7", "g5", "g6"]
  }, {
    commands: ["e6", "expand", "endturn"],
    include: ["c3", "d4", "d5"]
  }, {
    commands: ["d5"],
    include: ["c4", "c5", "c6", "d7", "e4", "e5"]
  }, {
    commands: ["d7", "expand", "endturn"],
    include: ["e6", "f6", "g7"]
  }, {
    commands: ["e6"],
    include: ["d6", "e5", "e7", "f5", "f7"]
  }, {
    commands: ["d6", "expand", "endturn"],
    include: ["c3", "d4", "d5", "d7"]
  }, {
    commands: ["c3"],
    include: ["a1", "b3", "b4", "c2", "c4", "d2", "d3"]
  }, {
    commands: ["a1", "expand", "endturn"],
    include: ["e6", "f6", "g7"]
  }, {
    commands: ["g7"],
    include: ["f7", "f8", "g6", "g8", "h6", "h7"]
  }, {
    commands: ["f7", "expand", "endturn"],
    include: ["a1", "b2", "c3", "d4", "d5", "d7"]
  }, {
    commands: ["d4"],
    include: ["c4", "c5", "d2", "e3", "e4", "f6"]
  }, {
    commands: ["f6", "expand", "endturn"],
    include: ["e6", "f7", "g7"]
  }, {
    commands: ["e6"],
    include: ["d5", "e7", "f5"]
  }, {
    commands: ["d5", "expand", "endturn"],
    include: ["a1", "b2", "c3", "d4", "d7", "e5"]
  }]
};

export default duploTests;
