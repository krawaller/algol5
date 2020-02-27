import { FullDefAnon } from "../../../../../types";
import { emptyArtifactLayers } from "../../../../../common";

// TODO - decide on boardLayers func

export function executeHead(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "\n";

  ret += `const emptyObj = {}; `;
  ret += `const dimensions = { height: ${gameDef.board.height}, width: ${gameDef.board.width} }; `;

  ret += `
    const BOARD = boardLayers(dimensions);
  `;

  ret += `const iconMapping = ${JSON.stringify(gameDef.graphics.icons)};\n`;

  const startDef = gameDef.flow.startTurn || {};
  const startGens = (startDef.runGenerators || []).concat(
    startDef.runGenerator || []
  );
  if (!startGens.length) {
    ret += `
    const emptyArtifactLayers = ${JSON.stringify(
      emptyArtifactLayers(gameDef.generators)
    )};
  `;
  }

  ret += `
    const connections = boardConnections({ height: ${
      gameDef.board.height
    }, width: ${gameDef.board.width}${
    gameDef.board.offset
      ? `, offset: ${JSON.stringify(gameDef.board.offset)}`
      : ""
  }${
    gameDef.board.offsets
      ? `, offsets: ${JSON.stringify(gameDef.board.offsets)}`
      : ""
  } });
  `;

  let offsets = gameDef.board.offsets || [];
  if (gameDef.board.offset) offsets.push(gameDef.board.offset);
  ret += `const relativeDirs = makeRelativeDirs(${JSON.stringify(offsets)}); `;

  ret += `let TERRAIN1; let TERRAIN2;`;

  return ret;
}
