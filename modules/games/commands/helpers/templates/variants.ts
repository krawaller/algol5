export default function templateVariants(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `
import { ${capId}Definition } from "./_types";

const ${gameId}Variants: ${capId}Definition['variants'] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r"
  },
];

export default ${gameId}Variants;
`;
}
