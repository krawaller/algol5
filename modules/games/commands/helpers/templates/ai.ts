export default function templateAI(gameId) {
  return `import {AI} from '../../../types';

const ${gameId}AI: AI = {};

export default ${gameId}AI;
`
}
