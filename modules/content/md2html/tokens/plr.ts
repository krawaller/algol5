import { TokenHandler } from "./_handler";

// Takes a PLR token (reference to a player) and renders it with special styles. Expexts a "who" arg

export const plr: TokenHandler = opts => {
  const { args } = opts;
  const { who } = args;
  if (!who) {
    throw new Error("PLR must have a 'who' arg!");
  }
  const names: Record<string, string> = {
    0: "Neutral",
    1: "Player 1",
    2: "Player 2",
  };
  if (!names[who]) {
    throw new Error(`Unknown PLR ref "${who}"`);
  }
  return `<span class="md-plr md-plr-${who}" data-who="${who}" >${names[who]}</span>`;
};
