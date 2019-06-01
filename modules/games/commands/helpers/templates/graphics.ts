export default function templateGraphics(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Graphics } from './_types';

const ${gameId}Graphics: ${capId}Graphics = {
  icons: {

  },
  tiles: {

  }
};

export default ${gameId}Graphics;
`;
}
