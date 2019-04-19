import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction
} from "../../common";
import { AlgolStepLinks, AlgolGame } from "../../types";
const emptyObj = {};
const BOARD = boardLayers({ height: 10, width: 10 });
const emptyArtifactLayers = { targets: {} };
const connections = boardConnections({ height: 10, width: 10 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(10, 10, {});
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = { action: {}, instruction: {} };
{
  const groupLayers = {
    queens: [
      ["units", "queens"],
      ["units", "myunits", "queens"],
      ["units", "oppunits", "queens"]
    ],
    fires: [["units"], ["units", "myunits"], ["units", "oppunits"]]
  };
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      queens: oldUnitLayers.queens
    };
    let LINKS: AlgolStepLinks = {
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
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [
        { text: "Select" },
        { text: "a" },
        { unittype: "queen" },
        { text: "to move and fire with" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, queens: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let POS = MARKS.selectmovetarget;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = emptyObj;
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
  game.instruction.move1 = step => {
    return { text: "Now select where to fire at" };
  };
  game.action.fire1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, queens: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      LINKS.endTurn = "startTurn2";
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
  game.instruction.fire1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = emptyObj;
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
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Select where to move the" },
        { pos: MARKS.selectunit },
        { unittype: "queen" }
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      },
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget1 = step => {
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
  game.action.selectfiretarget1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.fire = "fire1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectfiretarget: newMarkPos },
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectfiretarget1 = step => {
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
  const groupLayers = {
    queens: [
      ["units", "queens"],
      ["units", "oppunits", "queens"],
      ["units", "myunits", "queens"]
    ],
    fires: [["units"], ["units", "oppunits"], ["units", "myunits"]]
  };
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      queens: oldUnitLayers.queens
    };
    let LINKS: AlgolStepLinks = {
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
  game.instruction.startTurn2 = step => {
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
    let UNITDATA = deduceInitialUnitData({
      queens: { "1": ["d10", "g10", "a7", "j7"], "2": ["a4", "d1", "g1", "j4"] }
    });
    let UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, queens: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      NEXTSPAWNID: 1,
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, queens: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let POS = MARKS.selectmovetarget;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = emptyObj;
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
  game.instruction.move2 = step => {
    return { text: "Now select where to fire at" };
  };
  game.action.fire2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
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
    UNITLAYERS = { units: {}, myunits: {}, oppunits: {}, queens: {} };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      LINKS.endTurn = "startTurn1";
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
  game.instruction.fire2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      targets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;
      for (let DIR of roseDirs) {
        let POS = MARKS.selectunit;
        while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
          ARTIFACTS.targets[POS] = emptyObj;
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
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    return collapseContent({
      line: [
        { text: "Select where to move the" },
        { pos: MARKS.selectunit },
        { unittype: "queen" }
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: {
        selectunit: step.MARKS.selectunit,
        selectmovetarget: newMarkPos
      },
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectmovetarget2 = step => {
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
  game.action.selectfiretarget2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.fire = "fire2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectfiretarget: newMarkPos },
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectfiretarget2 = step => {
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
export default game as AlgolGame;
