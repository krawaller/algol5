import { DescentInstructions } from "./_types";

const descentInstructions: DescentInstructions = {
  startTurn: {
    line: [
      "Select",
      {
        orlist: [
          { if: [{ notempty: "mylvl3" }, "lvl3"] },
          { if: [{ notempty: "mylvl2" }, "lvl2"] },
          { if: [{ notempty: "mylvl1" }, "lvl1"] },
          { if: [{ notempty: "mylvl0" }, "lvl0"] }
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
              {
                and: [
                  { noneat: ["lvl3", "selectunit"] },
                  { noneat: ["lvl2", "selectunit"] }
                ]
              },
              { unittype: ["lvl0", 0] }
            ]
          },
          {
            if: [{ noneat: ["lvl3", "selectunit"] }, { unittype: ["lvl1", 0] }]
          },
          {
            if: [{ noneat: ["lvl0", "selectunit"] }, { unittype: ["lvl2", 0] }]
          },
          {
            if: [
              {
                and: [
                  { noneat: ["lvl0", "selectunit"] },
                  { noneat: ["lvl1", "selectunit"] }
                ]
              },
              { unittype: ["lvl3", 0] }
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
                  { anyat: ["lvl3", "selectunit"] },
                  {
                    and: [
                      { anyat: ["lvl2", "selectunit"] },
                      { anyat: ["lvl1", "selectmovetarget"] }
                    ]
                  },
                  {
                    and: [
                      { anyat: ["lvl1", "selectunit"] },
                      { anyat: ["lvl0", "selectmovetarget"] }
                    ]
                  }
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
          { unittype: ["lvl3", 0] },
          { unittype: ["lvl2", 0] },
          { unittype: ["lvl1", 0] }
        ]
      },
      "to dig"
    ]
  },
  selectdigtarget: {
    ifelse: [
      { anyat: ["lvl3", "selectdigtarget"] },
      {
        line: [
          "Press",
          "dig",
          "to turn",
          { unitat: "selectdigtarget" },
          "to",
          { unittype: ["lvl2", 0] }
        ]
      },
      {
        ifelse: [
          { anyat: ["lvl2", "selectdigtarget"] },
          {
            line: [
              "Press",
              "dig",
              "to turn",
              { unitat: "selectdigtarget" },
              "to",
              { unittype: ["lvl1", 0] }
            ]
          },
          {
            line: [
              "Press",
              "dig",
              "to turn",
              { unitat: "selectdigtarget" },
              "to",
              { unittype: ["lvl0", 0] }
            ]
          }
        ]
      }
    ]
  }
};

export default descentInstructions;
