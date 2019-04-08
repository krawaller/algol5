import { AtriumScripts } from './_types';

const atriumScripts: AtriumScripts = {
  basic: [{
    commands: [],
    include: ["a2", "a3", "c5", "d1", "d5", "e2"]
  }, {
    commands: ["e2"],
    include: ["d2", "e1"]
  }, {
    commands: ["d2", "move", "endturn"],
    include: ["a4", "b1", "b5", "c1", "e3", "e4"]
  }, {
    commands: ["e3"],
    include: ["d3", "e2"]
  }, {
    commands: ["d3", "move", "endturn"],
    include: ["a2", "a3", "c5", "d1", "d2", "d5"]
  }, {
    commands: ["c5", "c4", "move", "endturn"],
    include: ["a4", "b1", "b5", "c1", "d3", "e4"]
  }, {
    commands: ["d3"],
    include: ["c3", "d4", "e3"]
  }, {
    commands: ["c3", "move", "endturn"],
    include: ["a2", "a3", "c4", "d1", "d2", "d5"]
  }, {
    commands: ["a2", "b2", "move", "endturn"],
    include: ["a4", "b1", "b5", "c1", "c3", "e4"]
  }, {
    commands: ["c3", "b3", "move", "endturn"],
    include: ["a3", "b2", "c4", "d1", "d2", "d5"]
  }, {
    commands: ["c4", "c3", "move", "endturn"],
    include: ["a4", "b1", "b3", "b5", "c1", "e4"]
  }, {
    commands: ["b5", "b4", "move", "endturn"],
    include: ["a3", "b2", "c3", "d1", "d2", "d5"]
  }, {
    commands: ["c3", "c2", "move", "win"]
  }]
};

export default atriumScripts;
