export default function templateInstructions(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Instructions } from './_types';

const ${gameId}Instructions: ${capId}Instructions = {
  startTurn: { line: ["Go!"] }
};

export default ${gameId}Instructions;
`;
}
