import { TokenHandler } from "./_handler";

// Takes a DYNAMIC token and turns it into correct html

export const dynamic: TokenHandler = opts => {
  const { args } = opts;
  const { id } = args;
  if (!id) {
    throw new Error("Have to provide dynamic id");
  }
  return `<span data-dynamic data-dynamic-${id}></span>`;
};
