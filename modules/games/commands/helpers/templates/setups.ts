export default function templateSetup(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Definition } from './_types';

const ${gameId}SetupBook: ${capId}Definition['setups'] = {
  basic: {
    
  }
};

export default ${gameId}SetupBook;
`;
}
