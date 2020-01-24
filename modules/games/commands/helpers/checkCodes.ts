import allMeta from "../../dist/meta";

export function checkCodes() {
  const seenCodes: Record<string, boolean> = {};

  for (const [gameId, meta] of Object.entries(allMeta)) {
    const { code } = meta;
    if (!code) {
      throw new Error(`Game ${gameId} has no code!`);
    }
    if (seenCodes[code]) {
      throw new Error(
        `Game ${gameId} has duplicate code! Seen codes are: ${Object.keys(
          seenCodes
        ).join(" ")}`
      );
    }
    seenCodes[code] = true;
  }
}
