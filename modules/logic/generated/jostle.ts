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

const emptyArtifactLayers = {
  movetargets: {},
  initialenemy: {},
  initialfriend: {},
  newenemy: {},
  newfriend: {}
};

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
      checkers: oldUnitLayers.checkers,
      mycheckers: oldUnitLayers.oppcheckers,
      oppcheckers: oldUnitLayers.mycheckers,
      neutralcheckers: oldUnitLayers.neutralcheckers
    };
    let LINKS: Links = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.mycheckers)) {
      LINKS.actions[pos] = "selectunit1";
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
  game.start1instruction = step => {
    return { text: "Select which unit to jostle!" };
  };
  game.jostle1 = step => {
    let LINKS: Links = { actions: {} };
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
      neutralunits: {},
      checkers: {},
      mycheckers: {},
      oppcheckers: {},
      neutralcheckers: {}
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
      UNITLAYERS
    };
  };
  game.jostle1instruction = () => defaultInstruction(1);
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      initialenemy: { ...step.ARTIFACTS.initialenemy },
      initialfriend: { ...step.ARTIFACTS.initialfriend },
      newenemy: step.ARTIFACTS.newenemy,
      newfriend: step.ARTIFACTS.newfriend
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
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
          ][POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget1";
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
  game.selectunit1instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;

    return collapseContent({
      line: [
        { text: "This unit neighbours" },
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
        { text: ". Select a higher value square to jostle to" }
      ]
    });
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      initialenemy: step.ARTIFACTS.initialenemy,
      initialfriend: step.ARTIFACTS.initialfriend,
      newenemy: { ...step.ARTIFACTS.newenemy },
      newfriend: { ...step.ARTIFACTS.newfriend }
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectmovetarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectmovetarget];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.units[POS]) {
          ARTIFACTS[UNITLAYERS.oppunits[POS] ? "newenemy" : "newfriend"][
            POS
          ] = {};
        }
      }
    }
    if (
      Object.keys(ARTIFACTS.newfriend).length -
        (1 + Object.keys(ARTIFACTS.newenemy).length) >
      Object.keys(ARTIFACTS.initialfriend).length -
        Object.keys(ARTIFACTS.initialenemy).length
    ) {
      LINKS.actions.jostle = "jostle1";
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
  game.selectmovetarget1instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

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
        { text: "to move from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
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
      checkers: oldUnitLayers.checkers,
      mycheckers: oldUnitLayers.oppcheckers,
      oppcheckers: oldUnitLayers.mycheckers,
      neutralcheckers: oldUnitLayers.neutralcheckers
    };
    let LINKS: Links = {
      actions: {}
    };

    for (const pos of Object.keys(UNITLAYERS.mycheckers)) {
      LINKS.actions[pos] = "selectunit2";
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
  game.start2instruction = step => {
    return { text: "Select which unit to jostle!" };
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "c4",
        x: 3,
        y: 4,
        id: "unit1",
        group: "checkers",
        owner: 1
      },
      unit2: {
        pos: "c6",
        x: 3,
        y: 6,
        id: "unit2",
        group: "checkers",
        owner: 1
      },
      unit3: {
        pos: "c8",
        x: 3,
        y: 8,
        id: "unit3",
        group: "checkers",
        owner: 1
      },
      unit4: {
        pos: "d3",
        x: 4,
        y: 3,
        id: "unit4",
        group: "checkers",
        owner: 1
      },
      unit5: {
        pos: "d5",
        x: 4,
        y: 5,
        id: "unit5",
        group: "checkers",
        owner: 1
      },
      unit6: {
        pos: "d7",
        x: 4,
        y: 7,
        id: "unit6",
        group: "checkers",
        owner: 1
      },
      unit7: {
        pos: "e4",
        x: 5,
        y: 4,
        id: "unit7",
        group: "checkers",
        owner: 1
      },
      unit8: {
        pos: "e8",
        x: 5,
        y: 8,
        id: "unit8",
        group: "checkers",
        owner: 1
      },
      unit9: {
        pos: "f3",
        x: 6,
        y: 3,
        id: "unit9",
        group: "checkers",
        owner: 1
      },
      unit10: {
        pos: "f7",
        x: 6,
        y: 7,
        id: "unit10",
        group: "checkers",
        owner: 1
      },
      unit11: {
        pos: "g4",
        x: 7,
        y: 4,
        id: "unit11",
        group: "checkers",
        owner: 1
      },
      unit12: {
        pos: "g6",
        x: 7,
        y: 6,
        id: "unit12",
        group: "checkers",
        owner: 1
      },
      unit13: {
        pos: "g8",
        x: 7,
        y: 8,
        id: "unit13",
        group: "checkers",
        owner: 1
      },
      unit14: {
        pos: "h3",
        x: 8,
        y: 3,
        id: "unit14",
        group: "checkers",
        owner: 1
      },
      unit15: {
        pos: "h5",
        x: 8,
        y: 5,
        id: "unit15",
        group: "checkers",
        owner: 1
      },
      unit16: {
        pos: "h7",
        x: 8,
        y: 7,
        id: "unit16",
        group: "checkers",
        owner: 1
      },
      unit17: {
        pos: "c3",
        x: 3,
        y: 3,
        id: "unit17",
        group: "checkers",
        owner: 2
      },
      unit18: {
        pos: "c5",
        x: 3,
        y: 5,
        id: "unit18",
        group: "checkers",
        owner: 2
      },
      unit19: {
        pos: "c7",
        x: 3,
        y: 7,
        id: "unit19",
        group: "checkers",
        owner: 2
      },
      unit20: {
        pos: "d4",
        x: 4,
        y: 4,
        id: "unit20",
        group: "checkers",
        owner: 2
      },
      unit21: {
        pos: "d6",
        x: 4,
        y: 6,
        id: "unit21",
        group: "checkers",
        owner: 2
      },
      unit22: {
        pos: "d8",
        x: 4,
        y: 8,
        id: "unit22",
        group: "checkers",
        owner: 2
      },
      unit23: {
        pos: "e3",
        x: 5,
        y: 3,
        id: "unit23",
        group: "checkers",
        owner: 2
      },
      unit24: {
        pos: "e7",
        x: 5,
        y: 7,
        id: "unit24",
        group: "checkers",
        owner: 2
      },
      unit25: {
        pos: "f4",
        x: 6,
        y: 4,
        id: "unit25",
        group: "checkers",
        owner: 2
      },
      unit26: {
        pos: "f8",
        x: 6,
        y: 8,
        id: "unit26",
        group: "checkers",
        owner: 2
      },
      unit27: {
        pos: "g3",
        x: 7,
        y: 3,
        id: "unit27",
        group: "checkers",
        owner: 2
      },
      unit28: {
        pos: "g5",
        x: 7,
        y: 5,
        id: "unit28",
        group: "checkers",
        owner: 2
      },
      unit29: {
        pos: "g7",
        x: 7,
        y: 7,
        id: "unit29",
        group: "checkers",
        owner: 2
      },
      unit30: {
        pos: "h4",
        x: 8,
        y: 4,
        id: "unit30",
        group: "checkers",
        owner: 2
      },
      unit31: {
        pos: "h6",
        x: 8,
        y: 6,
        id: "unit31",
        group: "checkers",
        owner: 2
      },
      unit32: {
        pos: "h8",
        x: 8,
        y: 8,
        id: "unit32",
        group: "checkers",
        owner: 2
      }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      checkers: {},
      mycheckers: {},
      oppcheckers: {},
      neutralcheckers: {}
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
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.jostle2 = step => {
    let LINKS: Links = { actions: {} };
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
      neutralunits: {},
      checkers: {},
      mycheckers: {},
      oppcheckers: {},
      neutralcheckers: {}
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
      UNITLAYERS
    };
  };
  game.jostle2instruction = () => defaultInstruction(2);
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: { ...step.ARTIFACTS.movetargets },
      initialenemy: { ...step.ARTIFACTS.initialenemy },
      initialfriend: { ...step.ARTIFACTS.initialfriend },
      newenemy: step.ARTIFACTS.newenemy,
      newfriend: step.ARTIFACTS.newfriend
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
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
          ][POS] = {};
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget2";
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
  game.selectunit2instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;

    return collapseContent({
      line: [
        { text: "This unit neighbours" },
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
        { text: ". Select a higher value square to jostle to" }
      ]
    });
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      initialenemy: step.ARTIFACTS.initialenemy,
      initialfriend: step.ARTIFACTS.initialfriend,
      newenemy: { ...step.ARTIFACTS.newenemy },
      newfriend: { ...step.ARTIFACTS.newfriend }
    };
    let LINKS: Links = { actions: {} };
    let MARKS = { ...step.MARKS, selectmovetarget: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectmovetarget];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.units[POS]) {
          ARTIFACTS[UNITLAYERS.oppunits[POS] ? "newenemy" : "newfriend"][
            POS
          ] = {};
        }
      }
    }
    if (
      Object.keys(ARTIFACTS.newfriend).length -
        (1 + Object.keys(ARTIFACTS.newenemy).length) >
      Object.keys(ARTIFACTS.initialfriend).length -
        Object.keys(ARTIFACTS.initialenemy).length
    ) {
      LINKS.actions.jostle = "jostle2";
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
  game.selectmovetarget2instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

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
        { text: "to move from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
}
export default game;
