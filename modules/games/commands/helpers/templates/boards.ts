export default function templateBoard(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `import { AlgolBoardBookAnon } from "../../../types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate 
// the graphics from the graphics module.

const ${gameId}BoardBook: AlgolBoardBookAnon = {
  basic: {
    height: 5,
    width: 5,
    terrain: {}
  }
};

export default ${gameId}BoardBook;
`;
}
