import { OrthokonScripts } from './_types';

const orthokonScripts: OrthokonScripts = {
  basic: [{
    commands: [],
    include: ["a1", "b1", "c1", "d1"]
  }, {
    commands: ["a1"],
    include: ["a3", "c3"]
  }, {
    commands: ["c3", "move", "endturn"],
    include: ["a4", "b4", "d4"]
  }, {
    commands: ["d4", "d2", "move", "endturn"],
    include: ["b1", "c1", "c3", "c4"]
  }, {
    commands: ["b1"],
    include: ["a1", "a2", "b3", "d3"]
  }]
};

export default orthokonScripts;
