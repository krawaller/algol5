import { FullDefAnon } from "../../../../../types";

export function executePlayer(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  return `
    const ownerNames = ["neutral", ${
      player === 1 ? '"my", "opp"' : '"opp", "my"'
    }]; 
  `;
}
