import { TokenHandler } from "./_handler";

// Takes a POS token and renders it with special styles. Expexts an "at" arg

export const pos: TokenHandler = opts => {
  const { args } = opts;
  const { at } = args;
  if (!at) {
    throw new Error("Position must have an 'at' arg!");
  }
  return `<span class="md-pos" data-pos="${at}" >${at}</span>`;
};
