import { AlgolSection, FullDefAnon } from "../../../../types";
import { executeMarkEnd } from "./section.markEnd";
import { executeMarkInit } from "./section.markInit";
import { executeOrderSection } from "./section.orders";

export function executeSection(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  section: AlgolSection
): string {
  switch (section) {
    case "markInit":
      return executeMarkInit(gameDef, player, action);
    case "markEnd":
      return executeMarkEnd(gameDef, player, action);
    case "orders":
      return executeOrderSection(gameDef, player, action);
    default:
      throw new Error("Unknown section: " + JSON.stringify(section));
  }
}
