export default function templateAI(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `
// AI is not yet reimplemented in the new engine. Never mind this file, for now! :)

import { ${capId}AI } from "./_types";

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
