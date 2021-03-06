import { UglyduckDefinition } from "./_types";

const uglyduckScripts: UglyduckDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      {
        commands: [
          "b1",
          "b2",
          "move",
          "endTurn",
          "d5",
          "d4",
          "move",
          "endTurn",
        ],
      },
    ],
  },
];

export default uglyduckScripts;
