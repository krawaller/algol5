import { TokenHandler } from "./_handler";

// Takes a DYNAMIC token and turns it into correct html. Markdown component will update the contents.

export const dynamic: TokenHandler = opts => {
  const { args } = opts;
  const { id, style, text = "" } = args;
  if (!id) {
    throw new Error("Have to provide dynamic id");
  }
  const html = `<span data-dynamic data-dynamic-${id}>${text}</span>`;
  if (style === "button") {
    return `<button class="button">${html}</button>`;
  }
  if (style === "link") {
    return `<a href="#">${html}</a>`;
  }
  return html;
};
