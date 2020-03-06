import { newCode } from "../newCode";

export default function templateMeta(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Definition } from './_types';

const ${gameId}Meta: ${capId}Definition['meta'] = {
  id: "${gameId}",
  name: "${capId}",
  tags: [],
  tagline: "An awesome game!",
  source: "http://some.url.to.rules",
  code: "${newCode()}"
};

export default ${gameId}Meta;
`;
}
