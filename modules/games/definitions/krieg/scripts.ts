import { KriegScripts } from './_types';

const kriegScripts: KriegScripts = {
  basic: [
    { commands: [], include: ["a3", "b3", "b4"] },
    { commands: ["b3"], include: ["b2", "c3"] },
    { commands: ["c3", "move", "endturn"], include: ["c1", "c2", "d2"] },
    { commands: ["c2", "b2", "move", "endturn"], include: ["a3", "a4", "b4"] },
    { commands: ["a4"], include: ["b3"] },
    { commands: ["b3", "move", "endturn"], include: ["c1", "d1", "d2"] },
    { commands: ["d2"], include: ["c2", "d3"] },
    { commands: ["d3", "move", "endturn"], include: ["a3", "b4", "c3"] },
    { commands: ["c3"], include: ["c2", "c4"] },
    { commands: ["c2", "move", "endturn"], include: ["b2", "c1", "d1"] },
    { commands: ["d1", "d2", "move", "endturn"], include: ["a3", "b3", "b4"] },
    { commands: ["b3"], include: ["a4", "c3"] },
    { commands: ["c3", "move", "endturn"], include: ["b2", "c1", "d3"] },
    { commands: ["b2"], include: ["a2", "b1", "b3"] },
    { commands: ["b3", "move", "endturn"], include: ["a3", "b4", "c2"] },
    { commands: ["c2"], include: ["b2", "d1"] },
    { commands: ["d1", "move"], include: ["win"] },
    { commands: ["win"] }
  ]
};

export default kriegScripts;
