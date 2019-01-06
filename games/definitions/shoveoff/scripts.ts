import {GameTestSuite} from '../../../types';

const shoveoffTests: GameTestSuite = {
  basic: [{
    commands: [],
    include: ["a1", "a2", "a3", "a4", "b1", "b4", "c1", "c4", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["c1"],
    include: ["north"]
  }, {
    commands: ["north", "endturn"],
    include: ["a1", "a2", "a3", "a4", "b1", "b4", "c1", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["d1"],
    include: ["north", "west"]
  }, {
    commands: ["west", "endturn"],
    include: ["a1", "a2", "a3", "a4", "b1", "b4", "c1", "c4", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["d4"],
    include: ["west"]
  }, {
    commands: ["west", "endturn"],
    include: ["a1", "a2", "a3", "a4", "b1", "c1", "c4", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["b1", "north", "endturn"],
    include: ["a1", "a2", "a3", "a4", "b1", "c1", "c4", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["c4", "south", "endturn"],
    include: ["a1", "a2", "a3", "a4", "b1", "b4", "c4", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["c4", "south", "endturn"],
    include: ["a1", "a2", "a3", "a4", "b1", "c4", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["a1", "north", "win"]
  }]
};

export default shoveoffTests;
