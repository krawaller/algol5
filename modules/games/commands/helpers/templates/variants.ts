export default function templateVariants(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `
import { ${capId}VariantBook } from "./_types";

const ${gameId}VariantBook: ${capId}VariantBook = {
  basic: {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "basic",
  },
};

export default ${gameId}VariantBook;
`;
}
