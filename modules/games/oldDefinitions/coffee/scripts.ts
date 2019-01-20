import { CoffeeScripts } from './_types';

const coffeeScripts: CoffeeScripts = {
  basic: [{
    commands: [],
    include: ["a1", "a2", "a3", "a4", "a5", "b1", "b2", "b3", "b4", "b5", "c1", "c2", "c3", "c4", "c5", "d1", "d2", "d3", "d4", "d5", "e1", "e2", "e3", "e4", "e5"]
  }, {
    commands: ["c3"],
    include: ["downhill", "horisontal", "uphill", "vertical"]
  }, {
    commands: ["downhill", "endturn"],
    include: ["a5", "b4", "d2", "e1"]
  }, {
    commands: ["b4"],
    include: ["horisontal", "uphill", "vertical"]
  }, {
    commands: ["uphill", "endturn"],
    include: ["a3", "c5"]
  }, {
    commands: ["c5", "vertical", "endturn"],
    include: ["c1", "c2", "c4"]
  }, {
    commands: ["c2"],
    include: ["downhill", "horisontal", "uphill"]
  }]
};

export default coffeeScripts;
