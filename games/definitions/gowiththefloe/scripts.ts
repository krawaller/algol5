import {GameTestSuite} from '../../../types';

const gowiththefloeTests: GameTestSuite = {
  basic: [{
    commands: [],
    include: ["b2", "b7"]
  }, {
    commands: ["b7"],
    include: ["a6", "b5", "b6", "c6", "c7", "c8", "d5", "d7"]
  }, {
    commands: ["d5", "move", "endturn"],
    include: ["g2", "g7"]
  }, {
    commands: ["g7"],
    include: ["e5", "e7", "f6", "f7", "f8", "g5", "g6", "h6"]
  }, {
    commands: ["e5", "move", "endturn"],
    include: ["b2", "d5"]
  }, {
    commands: ["d5"],
    include: ["b3", "b5", "c4", "c5", "d3", "d4", "d6", "d7", "e4", "e6", "f3", "f7"]
  }, {
    commands: ["d3", "move", "endturn"],
    include: ["e5", "g2"]
  }, {
    commands: ["e5"],
    include: ["c3", "c5", "c7", "d6", "e3", "e4", "e6", "e7", "f4", "f5", "g3", "g5"]
  }, {
    commands: ["c3", "move", "endturn"],
    include: ["b2", "d3"]
  }, {
    commands: ["d3"],
    include: ["b5", "c2", "c4", "d1", "d2", "e2", "e3", "e4", "f1", "f3", "f5"]
  }, {
    commands: ["e4", "move", "endturn"],
    include: ["c3", "g2"]
  }, {
    commands: ["c3"],
    include: ["a3", "a5", "b2", "b3", "b4", "c1", "c2", "c4", "c5", "d2", "e1", "e3"]
  }, {
    commands: ["b2", "eat", "endturn"],
    include: ["e4"]
  }, {
    commands: ["e4"],
    include: ["c2", "c4", "e2", "e3", "e6", "f3", "f4", "f5", "g4", "g6"]
  }, {
    commands: ["c4", "move", "endturn"],
    include: ["g2"]
  }, {
    commands: ["g2", "e2", "move", "endturn"],
    include: ["c4"]
  }, {
    commands: ["c4", "c5", "move", "endturn"],
    include: ["e2"]
  }, {
    commands: ["e2", "d2", "move", "endturn"],
    include: ["c5"]
  }, {
    commands: ["c5", "b4", "move", "endturn"],
    include: ["d2"]
  }, {
    commands: ["d2", "c3", "move", "endturn"],
    include: ["b4"]
  }, {
    commands: ["b4"],
    include: ["a3", "a4", "a5", "b2", "b3", "b5", "b6", "d6"]
  }, {
    commands: ["d6", "move", "endturn"],
    include: ["c3"]
  }]
};

export default gowiththefloeTests;
