import { AmazonsDefinition } from "./_types";

const amazonsScripts: AmazonsDefinition["scripts"] = {
  basic: [
    {
      commands: ["d10"],
      include: [
        "a10",
        "b10",
        "b8",
        "c10",
        "c9",
        "d2",
        "d3",
        "d4",
        "d5",
        "d6",
        "d7",
        "d8",
        "d9",
        "e10",
        "e9",
        "f10",
        "f8",
        "g7",
        "h6",
        "i5"
      ]
    },
    {
      commands: ["d4", "move"],
      include: [
        "a1",
        "b2",
        "b4",
        "b6",
        "c3",
        "c4",
        "c5",
        "d10",
        "d2",
        "d3",
        "d5",
        "d6",
        "d7",
        "d8",
        "d9",
        "e3",
        "e4",
        "e5",
        "f2",
        "f4",
        "f6",
        "g4",
        "g7",
        "h4",
        "h8",
        "i4",
        "i9",
        "j10"
      ]
    },
    {
      commands: ["g4", "fire", "endTurn", "g1"],
      include: [
        "e1",
        "e3",
        "f1",
        "f2",
        "g2",
        "g3",
        "h1",
        "h2",
        "i1",
        "i3",
        "j1"
      ]
    },
    {
      commands: ["f2", "move"],
      include: [
        "a2",
        "b2",
        "c2",
        "d2",
        "e1",
        "e2",
        "e3",
        "f1",
        "f10",
        "f3",
        "f4",
        "f5",
        "f6",
        "f7",
        "f8",
        "f9",
        "g1",
        "g2",
        "g3",
        "h2",
        "h4",
        "i2",
        "i5",
        "j2",
        "j6"
      ]
    },
    {
      commands: ["f4", "fire", "endTurn", "d4"],
      include: [
        "a1",
        "b2",
        "b4",
        "b6",
        "c3",
        "c4",
        "c5",
        "d10",
        "d2",
        "d3",
        "d5",
        "d6",
        "d7",
        "d8",
        "d9",
        "e3",
        "e4",
        "e5",
        "f6",
        "g7",
        "h8",
        "i9",
        "j10"
      ]
    },
    {
      commands: ["d7", "move"],
      include: [
        "a10",
        "b5",
        "b7",
        "b9",
        "c6",
        "c7",
        "c8",
        "d10",
        "d2",
        "d3",
        "d4",
        "d5",
        "d6",
        "d8",
        "d9",
        "e6",
        "e7",
        "e8",
        "f5",
        "f7",
        "f9",
        "g7",
        "h7",
        "i7"
      ]
    }
  ]
};

export default amazonsScripts;
