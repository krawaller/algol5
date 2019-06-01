export default function templateAI(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}AI } from "./_types";

const ${gameId}AI: ${capId}AI = {
  brains: {},
  generators: {},
  aspects: {},
  grids: {},
  terrain: {}
};

export default ${gameId}AI;
`;
}
