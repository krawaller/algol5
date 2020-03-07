// This will only exist momentarily before the first analysis is done or while an analysis is being updated

export default function templateAnalysis(gameId: string) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return `export type ${capId}Definition = any;
`;
}
