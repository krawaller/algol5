import { HobbesDefinition } from "./_types";

const hobbesInstructions: HobbesDefinition["instructions"] = {
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: { onlyin: "myunits" } },
      "to",
      {
        ifelse: [
          { anyat: ["units", "selectmovetarget"] },
          { line: ["kill", { unitat: "selectmovetarget" }] },
          { pos: "selectmovetarget" },
        ],
      },
    ],
  },
  move: {
    ifelse: [
      { isempty: "oppunits" },
      {
        line: [
          "Since you killed the opponent",
          { unittype: ["kings", ["otherplayer"]] },
          "you may immediately",
          "endTurn",
        ],
      },
      {
        line: [
          "Now",
          "select",
          "a nearby",
          { unittype: ["stones", 0] },
          "to push or pull",
        ],
      },
    ],
  },
  selectstone: {
    line: ["Select", "where to push or pull", { unitat: "selectstone" }],
  },
  selectpushtarget: {
    line: [
      "Press",
      "push",
      "to make",
      { unitat: { onlyin: "myunits" } },
      "shove",
      { unitat: "selectstone" },
      "to",
      "selectpushtarget",
    ],
  },
  selectpulltarget: {
    line: [
      "Press",
      "pull",
      "to make",
      { unitat: { onlyin: "myunits" } },
      "move to",
      "selectpulltarget",
      "and drag",
      { unitat: "selectstone" },
      "with it",
    ],
  },
  startTurn: {
    ifelse: [
      { notempty: "vulnerable" },
      {
        line: [
          "Since you can reach",
          { unittype: ["kings", ["otherplayer"]] },
          "you must",
          "select",
          "it and move there!",
        ],
      },
      {
        ifelse: [
          { isempty: "nearbystonesnomove" },
          {
            line: [
              "Since there's no nearby",
              { unittype: ["stones", 0] },
              "you must",
              "select",
              "where to move",
            ],
          },
          {
            ifelse: [
              { isempty: "movetargets" },
              {
                line: [
                  "Since you can't move you must",
                  "select",
                  "a nearby",
                  { unittype: ["stones", 0] },
                  "to push or pull",
                ],
              },
              {
                line: [
                  "Select",
                  "where to move",
                  { unittype: ["kings", ["player"]] },
                  "or a nearby",
                  { unittype: ["stones", 0] },
                  "to push or pull",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default hobbesInstructions;
