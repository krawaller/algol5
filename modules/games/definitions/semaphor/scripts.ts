import {GameTestSuite} from '../../../types';

const semaphorTests: GameTestSuite = {
  basic: [{
    commands: [],
    include: ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3", "d1", "d2", "d3"]
  }, {
    commands: ["c2"],
    include: ["deploy"]
  }, {
    commands: ["deploy", "endturn"],
    include: ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3", "d1", "d2", "d3"]
  }, {
    commands: ["c2"],
    include: ["promote"]
  }, {
    commands: ["promote", "endturn", "c2", "promote", "endturn"],
    include: ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c3", "d1", "d2", "d3"]
  }, {
    commands: ["b2", "deploy", "endturn", "b2", "promote", "endturn", "b2", "promote", "endturn"],
    include: ["a1", "a2", "a3", "b1", "b3", "c1", "c3", "d1", "d2", "d3"]
  }, {
    commands: ["a2", "deploy", "endturn", "a2", "promote", "endturn", "a2", "promote"],
    include: ["win"]
  }]
};

export default semaphorTests;
