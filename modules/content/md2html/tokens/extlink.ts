import { TokenHandler } from "./_handler";

// Takes an EXTLINK token and turns it into clickable link. expects `url` and `text` argument

export const extlink: TokenHandler = opts => {
  const { args } = opts;
  const { url, text, style } = args;
  if (!url) {
    throw new Error("Have to provide extlink url!");
  }
  if (!text) {
    throw new Error("Have to provide extlink text!");
  }
  const processedText = url.replace(/EQUALS/g, "=").replace(/COLON/g, ":");
  const link = `<a class="md-external-link" href="${processedText}" target="_blank" rel="noopener">${text}</a>`;
  if (style === "button") {
    return `<button class="button">${link}</button>`;
  }
  return link;
};
