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
const dimensions = { height: 4, width: 4 };
const BOARD = boardLayers(dimensions);
const iconMapping = { pawns: "pawn", knights: "knight", rooks: "rook" };
const emptyArtifactLayers = { movetargets: {}, digtargets: {}, winline: {} };
const connections = boardConnections({ height: 4, width: 4 });
const relativeDirs = makeRelativeDirs([]);
const TERRAIN = terrainLayers(4, 4, {});
let game = {
  gameId: "descent",
  action: {},
  instruction: {},
  commands: { move: {}, dig: {} },
  iconMap: { pawns: "pawn", knights: "knight", rooks: "rook" }
};
{
  const groupLayers = {
    pawns: [
      ["units", "neutralunits", "pawns"],
      ["units", "myunits", "pawns", "mypawns"],
      ["units", "oppunits", "pawns", "opppawns"]
    ],
    knights: [
      ["units", "neutralunits", "knights"],
      ["units", "myunits", "knights", "myknights"],
      ["units", "oppunits", "knights", "oppknights"]
    ],
    rooks: [
      ["units", "neutralunits", "rooks"],
      ["units", "myunits", "rooks", "myrooks"],
      ["units", "oppunits", "rooks", "opprooks"]
    ]
  };
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      pawns: oldUnitLayers.pawns,
      mypawns: oldUnitLayers.opppawns,
      opppawns: oldUnitLayers.mypawns,
      knights: oldUnitLayers.knights,
      myknights: oldUnitLayers.oppknights,
      oppknights: oldUnitLayers.myknights,
      rooks: oldUnitLayers.rooks,
      myrooks: oldUnitLayers.opprooks,
      opprooks: oldUnitLayers.myrooks
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.marks[pos] = "selectunit1";
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
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mypawns).length !== 0
              ? { unittype: ["pawn", 1] }
              : undefined,
            Object.keys(UNITLAYERS.myknights).length !== 0
              ? { unittype: ["knight", 1] }
              : undefined,
            Object.keys(UNITLAYERS.myrooks).length !== 0
              ? { unittype: ["rook", 1] }
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
        { text: "to move and dig with" }
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    TURNVARS.movedto = MARKS.selectmovetarget;
    TURNVARS.heightfrom = (UNITLAYERS.units[MARKS.selectunit] || {}).group;
    TURNVARS.heightto = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: TURNVARS["heightto"]
        };
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectunit,
        id: newunitid,
        group: TURNVARS["heightfrom"],
        owner: 0
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      knights: {},
      myknights: {},
      oppknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let startconnections = connections[TURNVARS["movedto"]];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.neutralunits[POS]) {
          ARTIFACTS.digtargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.digtargets)) {
      LINKS.marks[pos] = "selectdigtarget1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,
      NEXTSPAWNID
    };
  };
  game.instruction.move1 = step => {
    return collapseContent({
      line: [
        { text: "Now" },
        { select: "select" },
        { text: "a neighbouring" },
        collapseContent({
          line: [
            { unittype: ["rook", 0] },
            { unittype: ["knight", 0] },
            { unittype: ["pawn", 0] }
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
        { text: "to dig" }
      ]
    });
  };
  game.action.dig1 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: step.ARTIFACTS.digtargets,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (UNITLAYERS.pawns[MARKS.selectdigtarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectdigtarget] || {}).id];
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdigtarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.knights[MARKS.selectdigtarget]
              ? "pawns"
              : "knights"
          };
        }
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      knights: {},
      myknights: {},
      oppknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.myunits) {
        let allowedsteps = UNITLAYERS.myrooks[STARTPOS]
          ? UNITLAYERS.myrooks
          : UNITLAYERS.myknights[STARTPOS]
          ? UNITLAYERS.myknights
          : UNITLAYERS.mypawns;
        for (let DIR of roseDirs) {
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
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.dig1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (UNITLAYERS.rooks[MARKS.selectunit]
            ? !UNITLAYERS.pawns[POS]
            : UNITLAYERS.pawns[MARKS.selectunit]
            ? !UNITLAYERS.rooks[POS]
            : true)
        ) {
          if (UNITLAYERS.neutralunits[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
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
      MARKS,
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            !UNITLAYERS.mypawns[MARKS.selectunit]
              ? { unittype: ["rook", 0] }
              : undefined,
            { unittype: ["knight", 0] },
            !UNITLAYERS.myrooks[MARKS.selectunit]
              ? { unittype: ["pawn", 0] }
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
        { text: "to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "to" }
      ]
    });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.move = "move1";
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectmovetarget1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        (UNITLAYERS.units[MARKS.selectunit] || {}).group ===
        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
          ? { text: "walk" }
          : UNITLAYERS.rooks[MARKS.selectunit] ||
            UNITLAYERS.pawns[MARKS.selectmovetarget]
          ? { text: "descend" }
          : { text: "climb" },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.action.selectdigtarget1 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.dig = "dig1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectdigtarget: newMarkPos },
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectdigtarget1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return UNITLAYERS.rooks[MARKS.selectdigtarget]
      ? collapseContent({
          line: [
            { text: "Press" },
            { command: "dig" },
            { text: "to turn" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                MARKS.selectdigtarget
              ]
            },
            { text: "to" },
            { unittype: ["knight", 0] }
          ]
        })
      : UNITLAYERS.knights[MARKS.selectdigtarget]
      ? collapseContent({
          line: [
            { text: "Press" },
            { command: "dig" },
            { text: "to turn" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                MARKS.selectdigtarget
              ]
            },
            { text: "to" },
            { unittype: ["pawn", 0] }
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "dig" },
            { text: "to destroy" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                MARKS.selectdigtarget
              ]
            }
          ]
        });
  };
}
{
  const groupLayers = {
    pawns: [
      ["units", "neutralunits", "pawns"],
      ["units", "oppunits", "pawns", "opppawns"],
      ["units", "myunits", "pawns", "mypawns"]
    ],
    knights: [
      ["units", "neutralunits", "knights"],
      ["units", "oppunits", "knights", "oppknights"],
      ["units", "myunits", "knights", "myknights"]
    ],
    rooks: [
      ["units", "neutralunits", "rooks"],
      ["units", "oppunits", "rooks", "opprooks"],
      ["units", "myunits", "rooks", "myrooks"]
    ]
  };
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      pawns: oldUnitLayers.pawns,
      mypawns: oldUnitLayers.opppawns,
      opppawns: oldUnitLayers.mypawns,
      knights: oldUnitLayers.knights,
      myknights: oldUnitLayers.oppknights,
      oppknights: oldUnitLayers.myknights,
      rooks: oldUnitLayers.rooks,
      myrooks: oldUnitLayers.opprooks,
      opprooks: oldUnitLayers.myrooks
    };
    let LINKS = {
      marks: {},
      commands: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.marks[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN,
      NEXTSPAWNID: step.NEXTSPAWNID,
      TURNVARS: {}
    };
  };
  game.instruction.startTurn2 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mypawns).length !== 0
              ? { unittype: ["pawn", 2] }
              : undefined,
            Object.keys(UNITLAYERS.myknights).length !== 0
              ? { unittype: ["knight", 2] }
              : undefined,
            Object.keys(UNITLAYERS.myrooks).length !== 0
              ? { unittype: ["rook", 2] }
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
        { text: "to move and dig with" }
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = setup2army({
      rooks: {
        "0": [{ rect: ["a2", "d3"] }, "b4", "c1"],
        "1": ["a1", "c4", "d1"],
        "2": ["a4", "b1", "d4"]
      }
    });
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      knights: {},
      myknights: {},
      oppknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {}
    };
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
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let TURNVARS = { ...step.TURNVARS };
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let MARKS = step.MARKS;
    TURNVARS.movedto = MARKS.selectmovetarget;
    TURNVARS.heightfrom = (UNITLAYERS.units[MARKS.selectunit] || {}).group;
    TURNVARS.heightto = (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group;
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          group: TURNVARS["heightto"]
        };
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectunit,
        id: newunitid,
        group: TURNVARS["heightfrom"],
        owner: 0
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      knights: {},
      myknights: {},
      oppknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      let startconnections = connections[TURNVARS["movedto"]];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.neutralunits[POS]) {
          ARTIFACTS.digtargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.digtargets)) {
      LINKS.marks[pos] = "selectdigtarget2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS,
      NEXTSPAWNID
    };
  };
  game.instruction.move2 = step => {
    return collapseContent({
      line: [
        { text: "Now" },
        { select: "select" },
        { text: "a neighbouring" },
        collapseContent({
          line: [
            { unittype: ["rook", 0] },
            { unittype: ["knight", 0] },
            { unittype: ["pawn", 0] }
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
        { text: "to dig" }
      ]
    });
  };
  game.action.dig2 = step => {
    let LINKS = { marks: {}, commands: {} };
    let ARTIFACTS = {
      movetargets: step.ARTIFACTS.movetargets,
      digtargets: step.ARTIFACTS.digtargets,
      winline: {}
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (UNITLAYERS.pawns[MARKS.selectdigtarget]) {
      delete UNITDATA[(UNITLAYERS.units[MARKS.selectdigtarget] || {}).id];
    } else {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectdigtarget] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: UNITLAYERS.knights[MARKS.selectdigtarget]
              ? "pawns"
              : "knights"
          };
        }
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      pawns: {},
      mypawns: {},
      opppawns: {},
      knights: {},
      myknights: {},
      oppknights: {},
      rooks: {},
      myrooks: {},
      opprooks: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    {
      for (let STARTPOS in UNITLAYERS.myunits) {
        let allowedsteps = UNITLAYERS.myrooks[STARTPOS]
          ? UNITLAYERS.myrooks
          : UNITLAYERS.myknights[STARTPOS]
          ? UNITLAYERS.myknights
          : UNITLAYERS.mypawns;
        for (let DIR of roseDirs) {
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
              ARTIFACTS.winline[POS] = emptyObj;
            }
          }
        }
      }
    }
    if (Object.keys(ARTIFACTS.winline).length !== 0) {
      LINKS.endGame = "win";
      LINKS.endedBy = "madeline";
      LINKS.endMarks = Object.keys(ARTIFACTS.winline);
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS,
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.dig2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS = { marks: {}, commands: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (UNITLAYERS.rooks[MARKS.selectunit]
            ? !UNITLAYERS.pawns[POS]
            : UNITLAYERS.pawns[MARKS.selectunit]
            ? !UNITLAYERS.rooks[POS]
            : true)
        ) {
          if (UNITLAYERS.neutralunits[POS]) {
            ARTIFACTS.movetargets[POS] = emptyObj;
          }
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
      MARKS,
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            !UNITLAYERS.mypawns[MARKS.selectunit]
              ? { unittype: ["rook", 0] }
              : undefined,
            { unittype: ["knight", 0] },
            !UNITLAYERS.myrooks[MARKS.selectunit]
              ? { unittype: ["pawn", 0] }
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
        { text: "to move" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        { text: "to" }
      ]
    });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.move = "move2";
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
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.instruction.selectmovetarget2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to make" },
        {
          unit: [
            iconMapping[(UNITLAYERS.units[MARKS.selectunit] || {}).group],
            (UNITLAYERS.units[MARKS.selectunit] || {}).owner,
            MARKS.selectunit
          ]
        },
        (UNITLAYERS.units[MARKS.selectunit] || {}).group ===
        (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
          ? { text: "walk" }
          : UNITLAYERS.rooks[MARKS.selectunit] ||
            UNITLAYERS.pawns[MARKS.selectmovetarget]
          ? { text: "descend" }
          : { text: "climb" },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.action.selectdigtarget2 = (step, newMarkPos) => {
    let LINKS = { marks: {}, commands: {} };
    LINKS.commands.dig = "dig2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectdigtarget: newMarkPos },
      TURNVARS: step.TURNVARS,
      NEXTSPAWNID: step.NEXTSPAWNID,
      canAlwaysEnd: true
    };
  };
  game.instruction.selectdigtarget2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return UNITLAYERS.rooks[MARKS.selectdigtarget]
      ? collapseContent({
          line: [
            { text: "Press" },
            { command: "dig" },
            { text: "to turn" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                MARKS.selectdigtarget
              ]
            },
            { text: "to" },
            { unittype: ["knight", 0] }
          ]
        })
      : UNITLAYERS.knights[MARKS.selectdigtarget]
      ? collapseContent({
          line: [
            { text: "Press" },
            { command: "dig" },
            { text: "to turn" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                MARKS.selectdigtarget
              ]
            },
            { text: "to" },
            { unittype: ["pawn", 0] }
          ]
        })
      : collapseContent({
          line: [
            { text: "Press" },
            { command: "dig" },
            { text: "to destroy" },
            {
              unit: [
                iconMapping[
                  (UNITLAYERS.units[MARKS.selectdigtarget] || {}).group
                ],
                (UNITLAYERS.units[MARKS.selectdigtarget] || {}).owner,
                MARKS.selectdigtarget
              ]
            }
          ]
        });
  };
}
export default game;
