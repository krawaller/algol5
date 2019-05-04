import { DescentInstructions } from './_types';

const descentInstructions: DescentInstructions = {
  startTurn: {
    line: [
      "Select",
      {
        orlist: [
          { if: [{ notempty: "mypawns" }, "pawns"] },
          { if: [{ notempty: "myknights" }, "knights"] },
          { if: [{ notempty: "myrooks" }, "rooks"] }
        ]
      },
      "to move and dig with"
    ]
  },
  selectunit: {
    line: [
      "Select",
      {
        orlist: [
          {
            if: [
              { noneat: ["mypawns", "selectunit"] },
              { unittype: ["rooks", 0] }
            ]
          },
          { unittype: ["knights", 0] },
          {
            if: [
              { noneat: ["myrooks", "selectunit"] },
              { unittype: ["pawns", 0] }
            ]
          }
        ]
      },
      "to move",
      { unitat: "selectunit" },
      "to"
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      {
        ifelse: [
          {
            same: [
              { read: ["units", "selectunit", "group"] },
              { read: ["units", "selectmovetarget", "group"] }
            ]
          },
          "walk",
          {
            ifelse: [
              {
                or: [
                  { anyat: ["rooks", "selectunit"] },
                  { anyat: ["pawns", "selectmovetarget"] }
                ]
              },
              "descend",
              "climb"
            ]
          }
        ]
      },
      "to",
      "selectmovetarget"
    ]
  },
  move: {
    line: [
      "Now",
      "select",
      "a neighbouring",
      {
        orlist: [
          { unittype: ["rooks", 0] },
          { unittype: ["knights", 0] },
          { unittype: ["pawns", 0] }
        ]
      },
      "to dig"
    ]
  },
  selectdigtarget: {
    ifelse: [
      { anyat: ["rooks", "selectdigtarget"] },
      {
        line: [
          "Press",
          "dig",
          "to turn",
          { unitat: "selectdigtarget" },
          "to",
          { unittype: ["knights", 0] }
        ]
      },
      {
        ifelse: [
          { anyat: ["knights", "selectdigtarget"] },
          {
            line: [
              "Press",
              "dig",
              "to turn",
              { unitat: "selectdigtarget" },
              "to",
              { unittype: ["pawns", 0] }
            ]
          },
          {
            line: ["Press", "dig", "to destroy", { unitat: "selectdigtarget" }]
          }
        ]
      }
    ]
  }
};

export default descentInstructions;
