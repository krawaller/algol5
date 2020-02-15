import { TokenHandler } from "./_handler";

// Takes an OUTCOME token (reference to a battle outcome) and renders it with special styles. Expexts a "what" arg

export const plr: TokenHandler = opts => {
  const { args } = opts;
  const { what } = args;
  if (!what) {
    throw new Error("OUTCOME must have a 'what' arg!");
  }
  const names: Record<string, string> = {
    win: "Neutral",
    draw: "Player 1",
    lose: "Player 2",
  };
  if (!names[what]) {
    throw new Error(`Unknown OUTCOME ref "${what}"`);
  }

  return `<span class="md-outcome md-outcome-${what}" data-outcome="${what}" >${names[what]}</span>`;
};
