import { PaperneutronDefinition } from "./_types";

const paperneutronInstructions: PaperneutronDefinition["instructions"] = {
  startTurn: { line: ["Go!"] },
  selectunit: { line: ["Where to?"] },
  selectslidetarget: { line: ["Press", "slide", "to go there OMG!"] },
  slide: { line: ["Well done!"] }, // TODO
};

export default paperneutronInstructions;
