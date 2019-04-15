export default function templateMeta(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Meta } from './_types';

const ${gameId}Meta: ${capId}Meta = {
  id: "${gameId}",
  performance: { canAlwaysEnd: {} },
  name: "",
  tags: [],
  tagline: "",
};

export default ${gameId}Meta;
`;
}
