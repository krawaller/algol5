import { typeSignature } from "../../../../types";

export default function templateBoard(gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { ${capId}Board } from './_types';

const ${gameId}Board: ${capId}Board = {
  height: 666,
  width: 666,
  terrain: {

  }
};

export default ${gameId}Board;
`;
}
