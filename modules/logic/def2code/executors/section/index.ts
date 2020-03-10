import { AlgolSection, FullDefAnon } from "../../../../types";
import { executeMarkEnd, executeMarkInit } from "./mark";
import { executeStartInit, executeStartEnd } from "./start";
import { executeCmndInit, executeCmndEnd } from "./cmnd";
import { executeNewBattle } from "./battle";
import { executeHead } from "./head";
import { executeOrderSection } from "./section.orders";
import { executeInstructionSection } from "./instruction";
import { executeSetBoard } from "./board";

export function executeSection(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  section: AlgolSection
): string {
  switch (section) {
    case "newBattle":
      return executeNewBattle(gameDef, player, action, ruleset);
    case "markInit":
      return executeMarkInit(gameDef, player, action, ruleset);
    case "markEnd":
      return executeMarkEnd(gameDef, player, action, ruleset);
    case "orders":
      return executeOrderSection(gameDef, player, action, ruleset);
    case "startInit":
      return executeStartInit(gameDef, player, action, ruleset);
    case "startEnd":
      return executeStartEnd(gameDef, player, action, ruleset);
    case "cmndInit":
      return executeCmndInit(gameDef, player, action, ruleset);
    case "cmndEnd":
      return executeCmndEnd(gameDef, player, action, ruleset);
    case "head":
      return executeHead(gameDef, player, action, ruleset);
    case "instruction":
      return executeInstructionSection(gameDef, player, action, ruleset);
    case "setBoard":
      return executeSetBoard(gameDef, player, action, ruleset);
    default:
      throw new Error("Unknown section: " + JSON.stringify(section));
  }
}
