export default function templateAnim(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Anim } from './_types';

const ${gameId}Anim: ${capId}Anim = {

};

export default ${gameId}Anim;
`;
}
