import { TokenHandler } from "./_handler";

// Takes an INTLINK token and turns it into clickable internal link. expects `url` and `text` argument

export const intlink: TokenHandler = opts => {
  const { args } = opts;
  const { url, text } = args;
  if (!url) {
    throw new Error(`Have to provide intlink url!`);
  }
  if (url[0] !== "/") {
    throw new Error(`Intlink ${url} doesnt look like an internal link!`);
  }
  if (!text) {
    throw new Error(`Have to provide intlink text for url ${url}!`);
  }
  return `<a class="md-internal-link" href="${url}" data-algollink="${url}">${text.replace(
    /COMMA/,
    ","
  )}</a>`;
};
