export default function templateMeta(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Meta } from './_types';

const ${gameId}Meta: ${capId}Meta = {
  id: "${gameId}",
  name: "${capId}",
  tags: [],
  tagline: "An awesome game!",
  source: "http://some.url.to.rules",
  code: "" // this must be a unique character! try 'npm run checkCodes'
};

export default ${gameId}Meta;
`;
}
