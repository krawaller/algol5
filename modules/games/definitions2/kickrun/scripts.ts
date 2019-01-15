import { KickrunScripts } from './_types';

const kickrunScripts: KickrunScripts = {
  basic: [{
    commands: ["c1"],
    include: ["c2", "d1"]
  }, {
    commands: ["c2", "move", "endturn"],
    include: ["c5", "d5", "e3", "e4"]
  }, {
    commands: ["d5"],
    include: ["b3", "c4", "d1", "d2", "d3", "d4"]
  }, {
    commands: ["d1", "move", "endturn"],
    include: ["a2", "a3", "b1", "c2"]
  }, {
    commands: ["c2"],
    include: ["c3", "d1", "d2"]
  }, {
    commands: ["d1", "move", "endturn"],
    include: ["c5", "e3", "e4", "e5"]
  }, {
    commands: ["e4"],
    include: ["a4", "b4", "c2", "c4", "d3", "d4"]
  }]
};

export default kickrunScripts;
