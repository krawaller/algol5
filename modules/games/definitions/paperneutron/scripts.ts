import { PaperneutronDefinition } from "./_types";

const paperneutronScripts: PaperneutronDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a1", "a3", "slide", "endTurn"] },
      {
        commands: [
          "b3",
          "d3",
          "slide",
          "b3",
          "slide",
          "c4",
          "c2",
          "slide",
          "endTurn",
        ],
      },
    ],
  },
];

export default paperneutronScripts;
