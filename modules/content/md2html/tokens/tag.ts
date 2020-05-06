import { TokenHandler } from "./_handler";
import { intlink } from "./intlink";

import tagIndex from "../../dist/tagIndex";

// Takes a TAG token and turns it into clickable link

export const tag: TokenHandler = opts => {
  const { args } = opts;
  let { id, text } = args;
  if (!id) {
    throw new Error("Tag ref didn't have id!");
  }
  const def = tagIndex[id];
  if (!def) {
    throw new Error(`Unknown tagId "${id}"!`);
  }
  return intlink({
    ...opts,
    args: {
      text: (text || def.title).replace(/COMMA/, ""),
      url: `/tags/${def.slug}`,
    },
  });
};
