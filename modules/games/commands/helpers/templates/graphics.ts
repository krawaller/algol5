export default function templateGraphics(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `// Here you define how terrains should be drawn, and what icons (pawn, rook, etc) to use
// for the various groups. The group-icon mapping here is used as the source of truth for what
// groups are available in your game. Add a group here, run the type analysis and it will be added
// to the types for the game!

import { ${capId}Definition } from './_types';

const ${gameId}Graphics: ${capId}Definition['graphics'] = {
  icons: {

  },
  tiles: {

  }
};

export default ${gameId}Graphics;
`;
}
