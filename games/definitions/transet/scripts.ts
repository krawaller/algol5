import {GameTestSuite} from '../../../types';

const transetTests: GameTestSuite = {
  basic: [{
    commands: [],
    include: ["a1", "b1", "c1", "d1", "e1"]
  }, {
    commands: ["c1"],
    include: ["b2", "c2", "d2"]
  }, {
    commands: ["c2", "move", "endturn"],
    include: ["a5", "b5", "c5", "d5", "e5"]
  }, {
    commands: ["b5"],
    include: ["a4", "c4"]
  }, {
    commands: ["c4", "move", "endturn"],
    include: ["a1", "b1", "c2", "d1", "e1"]
  }, {
    commands: ["c2"],
    include: ["a1", "b1", "b3", "c3", "d1", "d3", "e1"]
  }, {
    commands: ["d1"],
    include: ["c1", "d2"]
  }, {
    commands: ["d2", "swap", "endturn"],
    include: ["a5", "c4", "c5", "d5", "e5"]
  }, {
    commands: ["c4"],
    include: ["a5", "b3", "c5", "d3"]
  }, {
    commands: ["d3", "move", "endturn"],
    include: ["a1", "b1", "c1", "d2", "e1"]
  }, {
    commands: ["d2"],
    include: ["a1", "b1", "c1", "c3", "d3", "e1", "e3"]
  }, {
    commands: ["d3", "b5", "move", "endturn"],
    include: ["a5", "b5", "c5", "d5", "e5"]
  }]
};

export default transetTests;
