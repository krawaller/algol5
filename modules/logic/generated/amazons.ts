import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent,
  defaultInstruction
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 10, width: 10 });

const emptyArtifactLayers = { targets: {} };

const connections = boardConnections({ height: 10, width: 10 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "starvation";
  actions: { [idx: string]: string };
};
{
  const ownerNames = ["neutral", "my", "opp"];
  game.start1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      queens: oldUnitLayers.queens,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens,
      neutralqueens: oldUnitLayers.neutralqueens,
      fires: oldUnitLayers.fires,
      myfires: oldUnitLayers.oppfires,
      oppfires: oldUnitLayers.myfires,
      neutralfires: oldUnitLayers.neutralfires
    };
    let LINKS: Links = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit1";
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID,
      TURNVARS: {}
    };
  };
  game.start1instruction = step => {
    return collapseContent({
      line: [
        { text: "Select" },
        { text: "a" },
        { unittype: "queen" },
        { text: "to move and fire with" }
      ]
    });
  };
  game.move1 = step => {
    let LINKS: Links = { actions: {} };
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };

    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    TURNVARS.movedto = MARKS.selectmovetarget;
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = MARKS.selectmovetarget;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.targets)) {
      LINKS.actions[pos] = "selectfiretarget1";
    }

    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.move1instruction = step => {
    return { text: "Now select where to fire at" };
  };
  game.fire1 = step => {
    let LINKS: Links = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = step.TURNVARS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectfiretarget,
        id: newunitid,
        group: "fires",
        owner: 0,
        from: TURNVARS["movedto"]
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID
    };
  };
  game.fire1instruction = () => defaultInstruction(1);
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.targets)) {
      LINKS.actions[pos] = "selectmovetarget1";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit1instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select where to move the" },
        { pos: MARKS.selectunit },
        { unittype: "queen" }
      ]
    });
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: Links = { actions: {} };

    LINKS.actions.move = "move1";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmovetarget1instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.selectfiretarget1 = (step, newMarkPos) => {
    let LINKS: Links = { actions: {} };

    LINKS.actions.fire = "fire1";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectfiretarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectfiretarget1instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "fire" },
        { text: "to destroy the square at" },
        { pos: MARKS.selectfiretarget }
      ]
    });
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  game.start2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      queens: oldUnitLayers.queens,
      myqueens: oldUnitLayers.oppqueens,
      oppqueens: oldUnitLayers.myqueens,
      neutralqueens: oldUnitLayers.neutralqueens,
      fires: oldUnitLayers.fires,
      myfires: oldUnitLayers.oppfires,
      oppfires: oldUnitLayers.myfires,
      neutralfires: oldUnitLayers.neutralfires
    };
    let LINKS: Links = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit2";
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID,
      TURNVARS: {}
    };
  };
  game.start2instruction = step => {
    return collapseContent({
      line: [
        { text: "Select" },
        { text: "a" },
        { unittype: "queen" },
        { text: "to move and fire with" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "d10",
        x: 4,
        y: 10,
        id: "unit1",
        group: "queens",
        owner: 1
      },
      unit2: {
        pos: "g10",
        x: 7,
        y: 10,
        id: "unit2",
        group: "queens",
        owner: 1
      },
      unit3: { pos: "a7", x: 1, y: 7, id: "unit3", group: "queens", owner: 1 },
      unit4: { pos: "j7", x: 10, y: 7, id: "unit4", group: "queens", owner: 1 },
      unit5: { pos: "a4", x: 1, y: 4, id: "unit5", group: "queens", owner: 2 },
      unit6: { pos: "d1", x: 4, y: 1, id: "unit6", group: "queens", owner: 2 },
      unit7: { pos: "g1", x: 7, y: 1, id: "unit7", group: "queens", owner: 2 },
      unit8: { pos: "j4", x: 10, y: 4, id: "unit8", group: "queens", owner: 2 }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    return game.start1({
      NEXTSPAWNID: 1,

      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.move2 = step => {
    let LINKS: Links = { actions: {} };
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };

    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    TURNVARS.movedto = MARKS.selectmovetarget;
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = MARKS.selectmovetarget;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.targets)) {
      LINKS.actions[pos] = "selectfiretarget2";
    }

    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.move2instruction = step => {
    return { text: "Now select where to fire at" };
  };
  game.fire2 = step => {
    let LINKS: Links = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = step.TURNVARS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectfiretarget,
        id: newunitid,
        group: "fires",
        owner: 0,
        from: TURNVARS["movedto"]
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      queens: {},
      myqueens: {},
      oppqueens: {},
      neutralqueens: {},
      fires: {},
      myfires: {},
      oppfires: {},
      neutralfires: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }
    {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,

      NEXTSPAWNID
    };
  };
  game.fire2instruction = () => defaultInstruction(2);
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targets: { ...step.ARTIFACTS.targets }
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.targets)) {
      LINKS.actions[pos] = "selectmovetarget2";
    }

    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit2instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Select where to move the" },
        { pos: MARKS.selectunit },
        { unittype: "queen" }
      ]
    });
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: Links = { actions: {} };

    LINKS.actions.move = "move2";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmovetarget2instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.selectfiretarget2 = (step, newMarkPos) => {
    let LINKS: Links = { actions: {} };

    LINKS.actions.fire = "fire2";

    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectfiretarget: newMarkPos },
      TURNVARS: step.TURNVARS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectfiretarget2instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "fire" },
        { text: "to destroy the square at" },
        { pos: MARKS.selectfiretarget }
      ]
    });
  };
}
export default game;
