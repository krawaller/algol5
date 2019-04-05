import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 3, width: 4 });

const emptyArtifactLayers = { line: {} };

const connections = boardConnections({ height: 3, width: 4 });
const relativeDirs = makeRelativeDirs();
const TERRAIN = {};
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "madeline" | "starvation";
  commands: {
    deploy?: "deploy1" | "deploy2";
    promote?: "promote1" | "promote2";
  };
  marks: {
    selectdeploytarget?: {
      func: "selectdeploytarget1" | "selectdeploytarget2";
      pos: string[];
    };
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
  };
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
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings,
      pawns: oldUnitLayers.pawns,
      mypawns: oldUnitLayers.opppawns,
      opppawns: oldUnitLayers.mypawns,
      neutralpawns: oldUnitLayers.neutralpawns,
      bishops: oldUnitLayers.bishops,
      mybishops: oldUnitLayers.oppbishops,
      oppbishops: oldUnitLayers.mybishops,
      neutralbishops: oldUnitLayers.neutralbishops
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selectdeploytarget = {
      func: "selectdeploytarget1",
      pos: Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: {} }), {})
      )
    };

    LINKS.marks.selectunit = {
      func: "selectunit1",
      pos: Object.keys({ ...UNITLAYERS.pawns, ...UNITLAYERS.bishops })
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.start1instruction = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.units).length !== 12
              ? { text: "an empty square to deploy to" }
              : undefined,
            Object.keys({ ...UNITLAYERS.bishops, ...UNITLAYERS.pawns })
              .length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    collapseContent({
                      line: [
                        Object.keys(UNITLAYERS.pawns).length !== 0
                          ? { unittype: "pawn" }
                          : undefined,
                        Object.keys(UNITLAYERS.bishops).length !== 0
                          ? { unittype: "bishop" }
                          : undefined
                      ]
                        .filter(i => !!i)
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " or " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    }),
                    { text: "to promote" }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        })
      ]
    });
  };
  game.deploy1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      line: { ...step.ARTIFACTS.line }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdeploytarget,
        id: newunitid,
        group: "pawns",
        owner: 0
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {}
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
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];

        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("deploy"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.promote1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      line: { ...step.ARTIFACTS.line }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: UNITLAYERS.pawns[MARKS.selectunit] ? "bishops" : "kings"
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {}
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
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];

        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("promote"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdeploytarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.deploy = "deploy1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdeploytarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdeploytarget: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdeploytarget1instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to place a pawn at" },
        { pos: MARKS.selectdeploytarget }
      ]
    });
  };
  game.selectunit1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.promote = "promote1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectunit: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit1instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "promote" },
        { text: "to turn the" },
        UNITLAYERS.pawns[MARKS.selectunit]
          ? { text: "pawn into a bishop" }
          : { text: "bishop into a king" }
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
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings,
      pawns: oldUnitLayers.pawns,
      mypawns: oldUnitLayers.opppawns,
      opppawns: oldUnitLayers.mypawns,
      neutralpawns: oldUnitLayers.neutralpawns,
      bishops: oldUnitLayers.bishops,
      mybishops: oldUnitLayers.oppbishops,
      oppbishops: oldUnitLayers.mybishops,
      neutralbishops: oldUnitLayers.neutralbishops
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };

    LINKS.marks.selectdeploytarget = {
      func: "selectdeploytarget2",
      pos: Object.keys(
        Object.keys(BOARD.board)
          .filter(k => !UNITLAYERS.units.hasOwnProperty(k))
          .reduce((m, k) => ({ ...m, [k]: {} }), {})
      )
    };

    LINKS.marks.selectunit = {
      func: "selectunit2",
      pos: Object.keys({ ...UNITLAYERS.pawns, ...UNITLAYERS.bishops })
    };

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.start2instruction = step => {
    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.units).length !== 12
              ? { text: "an empty square to deploy to" }
              : undefined,
            Object.keys({ ...UNITLAYERS.bishops, ...UNITLAYERS.pawns })
              .length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    collapseContent({
                      line: [
                        Object.keys(UNITLAYERS.pawns).length !== 0
                          ? { unittype: "pawn" }
                          : undefined,
                        Object.keys(UNITLAYERS.bishops).length !== 0
                          ? { unittype: "bishop" }
                          : undefined
                      ]
                        .filter(i => !!i)
                        .reduce((mem, i, n, list) => {
                          mem.push(i);
                          if (n === list.length - 2) {
                            mem.push({ text: " or " });
                          } else if (n < list.length - 2) {
                            mem.push({ text: ", " });
                          }
                          return mem;
                        }, [])
                    }),
                    { text: "to promote" }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        })
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = {};

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {}
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
  game.deploy2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      line: { ...step.ARTIFACTS.line }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectdeploytarget,
        id: newunitid,
        group: "pawns",
        owner: 0
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {}
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
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];

        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("deploy"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.promote2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      line: { ...step.ARTIFACTS.line }
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: UNITLAYERS.pawns[MARKS.selectunit] ? "bishops" : "kings"
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      neutralpawns: {},
      bishops: {},
      mybishops: {},
      oppbishops: {},
      neutralbishops: {}
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
      for (let STARTPOS in UNITLAYERS.units) {
        let allowedsteps = UNITLAYERS[(UNITLAYERS.units[STARTPOS] || {}).group];

        for (let DIR of [1, 2, 3, 4]) {
          let walkedsquares = [];
          let POS = "faux";
          connections.faux[DIR] = STARTPOS;
          while ((POS = connections[POS][DIR]) && allowedsteps[POS]) {
            walkedsquares.push(POS);
          }
          let WALKLENGTH = walkedsquares.length;
          for (let walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
            POS = walkedsquares[walkstepper];
            if (WALKLENGTH > 2) {
              ARTIFACTS.line[POS] = {};
            }
          }
        }
      }
    }

    if (Object.keys(ARTIFACTS.line).length !== 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.line);
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("promote"),
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdeploytarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.deploy = "deploy2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectdeploytarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectdeploytarget: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectdeploytarget2instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to place a pawn at" },
        { pos: MARKS.selectdeploytarget }
      ]
    });
  };
  game.selectunit2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.promote = "promote2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectunit: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit2instruction = step => {
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "promote" },
        { text: "to turn the" },
        UNITLAYERS.pawns[MARKS.selectunit]
          ? { text: "pawn into a bishop" }
          : { text: "bishop into a king" }
      ]
    });
  };
}
export default game;
