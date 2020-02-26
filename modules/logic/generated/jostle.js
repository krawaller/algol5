import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  setup2army,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction,
  roseDirs,
  orthoDirs,
  diagDirs,
  knightDirs
} from "../../common";
const emptyObj = {};
const dimensions = { height: 10, width: 10 };
const BOARD = boardLayers(dimensions);
const iconMapping = { checkers: "pawn" };
const emptyArtifactLayers = {
  movetargets: {},
  initialenemy: {},
  initialfriend: {},
  newenemy: {},
  newfriend: {}
};
const connections = boardConnections({ height: 10, width: 10 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(10, 10, {});
let game = {
  gameId: "jostle",
  action: {},
  instruction: {},
  commands: { jostle: {} },
  iconMap: { checkers: "pawn" }
};
{
  const groupLayers = {
    checkers: [
      ["units"],
      ["units", "myunits", "mycheckers"],
      ["units", "oppunits", "oppcheckers"]
    ]
  };
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      mycheckers: oldUnitLayers.oppcheckers,
      oppcheckers: oldUnitLayers.mycheckers
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.mycheckers)) {
      LINKS.marks[pos] = "selectunit1";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn1 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "which" },
        { unittype: ["pawn", 1] },
        { text: "to jostle" }
      ]
    });
  };
  game.action.jostle1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let UNITLAYERS = step.UNITLAYERS;
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
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      mycheckers: {},
      oppcheckers: {}
    };
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
      UNITLAYERS
    };
  };
  game.instruction.jostle1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {},
      initialenemy: {},
      initialfriend: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS) {
          ARTIFACTS[
            !UNITLAYERS.units[POS]
              ? "movetargets"
              : UNITLAYERS.oppunits[POS]
              ? "initialenemy"
              : "initialfriend"
          ][POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.marks[pos] = "selectmovetarget1";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "neighbours" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.initialfriend).length },
            Object.keys(ARTIFACTS.initialfriend).length === 1
              ? { text: "friend" }
              : { text: "friends" }
          ]
        }),
        { text: "and" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.initialenemy).length },
            Object.keys(ARTIFACTS.initialenemy).length === 1
              ? { text: "enemy" }
              : { text: "enemies" }
          ]
        }),
        { text: "making the square worth" },
        {
          text:
            Object.keys(ARTIFACTS.initialfriend).length -
            Object.keys(ARTIFACTS.initialenemy).length
        },
        { text: "." },
        { select: "Select" },
        { text: "a higher value square to jostle to" }
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      initialenemy: step.ARTIFACTS.initialenemy,
      initialfriend: step.ARTIFACTS.initialfriend,
      newenemy: {},
      newfriend: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectmovetarget];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.units[POS]) {
          ARTIFACTS[UNITLAYERS.oppunits[POS] ? "newenemy" : "newfriend"][
            POS
          ] = emptyObj;
        }
      }
    }
    if (
      Object.keys(ARTIFACTS.newfriend).length -
        (1 + Object.keys(ARTIFACTS.newenemy).length) >
      Object.keys(ARTIFACTS.initialfriend).length -
        Object.keys(ARTIFACTS.initialenemy).length
    ) {
      LINKS.commands.jostle = "jostle1";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectmovetarget1 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "From" },
        { pos: MARKS.selectmovetarget },
        { text: "you would neighbour" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.newfriend).length - 1 },
            Object.keys(ARTIFACTS.newfriend).length - 1 === 1
              ? { text: "friend" }
              : { text: "friends" }
          ]
        }),
        { text: "and" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.newenemy).length },
            Object.keys(ARTIFACTS.newenemy).length === 1
              ? { text: "enemy" }
              : { text: "enemies" }
          ]
        }),
        { text: "making the square worth" },
        {
          text:
            Object.keys(ARTIFACTS.newfriend).length -
            1 -
            Object.keys(ARTIFACTS.newenemy).length
        },
        { text: ". Press" },
        { command: "jostle" },
        { text: "to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
{
  const groupLayers = {
    checkers: [
      ["units"],
      ["units", "oppunits", "oppcheckers"],
      ["units", "myunits", "mycheckers"]
    ]
  };
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      mycheckers: oldUnitLayers.oppcheckers,
      oppcheckers: oldUnitLayers.mycheckers
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.mycheckers)) {
      LINKS.marks[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN
    };
  };
  game.instruction.startTurn2 = step => {
    return collapseContent({
      line: [
        { select: "Select" },
        { text: "which" },
        { unittype: ["pawn", 2] },
        { text: "to jostle" }
      ]
    });
  };
  game.newBattle = setup => {
    let UNITDATA = setup2army(setup);
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      mycheckers: {},
      oppcheckers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.jostle2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let UNITLAYERS = step.UNITLAYERS;
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
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      mycheckers: {},
      oppcheckers: {}
    };
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
      UNITLAYERS
    };
  };
  game.instruction.jostle2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {},
      initialenemy: {},
      initialfriend: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS) {
          ARTIFACTS[
            !UNITLAYERS.units[POS]
              ? "movetargets"
              : UNITLAYERS.oppunits[POS]
              ? "initialenemy"
              : "initialfriend"
          ][POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.marks[pos] = "selectmovetarget2";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "neighbours" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.initialfriend).length },
            Object.keys(ARTIFACTS.initialfriend).length === 1
              ? { text: "friend" }
              : { text: "friends" }
          ]
        }),
        { text: "and" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.initialenemy).length },
            Object.keys(ARTIFACTS.initialenemy).length === 1
              ? { text: "enemy" }
              : { text: "enemies" }
          ]
        }),
        { text: "making the square worth" },
        {
          text:
            Object.keys(ARTIFACTS.initialfriend).length -
            Object.keys(ARTIFACTS.initialenemy).length
        },
        { text: "." },
        { select: "Select" },
        { text: "a higher value square to jostle to" }
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      initialenemy: step.ARTIFACTS.initialenemy,
      initialfriend: step.ARTIFACTS.initialfriend,
      newenemy: {},
      newfriend: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: step.MARKS.selectunit,
      selectmovetarget: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectmovetarget];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.units[POS]) {
          ARTIFACTS[UNITLAYERS.oppunits[POS] ? "newenemy" : "newfriend"][
            POS
          ] = emptyObj;
        }
      }
    }
    if (
      Object.keys(ARTIFACTS.newfriend).length -
        (1 + Object.keys(ARTIFACTS.newenemy).length) >
      Object.keys(ARTIFACTS.initialfriend).length -
        Object.keys(ARTIFACTS.initialenemy).length
    ) {
      LINKS.commands.jostle = "jostle2";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectmovetarget2 = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "From" },
        { pos: MARKS.selectmovetarget },
        { text: "you would neighbour" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.newfriend).length - 1 },
            Object.keys(ARTIFACTS.newfriend).length - 1 === 1
              ? { text: "friend" }
              : { text: "friends" }
          ]
        }),
        { text: "and" },
        collapseContent({
          line: [
            { text: Object.keys(ARTIFACTS.newenemy).length },
            Object.keys(ARTIFACTS.newenemy).length === 1
              ? { text: "enemy" }
              : { text: "enemies" }
          ]
        }),
        { text: "making the square worth" },
        {
          text:
            Object.keys(ARTIFACTS.newfriend).length -
            1 -
            Object.keys(ARTIFACTS.newenemy).length
        },
        { text: ". Press" },
        { command: "jostle" },
        { text: "to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
export default game;
