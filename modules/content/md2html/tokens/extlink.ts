import { TokenHandler } from "./_symbol";

// Takes an EXTLINK token and turns it into clickable link. expects `url` and `text` argument

export const extlink: TokenHandler = opts => {
  const { args } = opts;
  const { url, text } = args;
  if (!url) {
    throw new Error("Have to provide extlink url!");
  }
  return `<a class="md-external-link" href="${url}" target="_blank" rel="noopener">${text}</a>`;
};
