import { NeutronDefinition } from "./_types";

const neutronScripts: NeutronDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a1", "a4", "slide", "endTurn"] },
      { commands: ["e3", "slide", "a5", "d2", "slide", "endTurn"] },
    ],
  },
];

export default neutronScripts;
