import { TokenHandler } from "./_handler";
import { intlink } from "./intlink";

import aboutIndex from "../../dist/aboutIndex";

// Takes an ABOUT token and turns it into clickable link

export const about: TokenHandler = opts => {
  const { args } = opts;
  let { id, text } = args;
  if (!id) {
    throw new Error("About ref didn't have id!");
  }
  const def = aboutIndex[id];
  if (!def) {
    throw new Error(`Unknown aboutId "${id}"!`);
  }
  return intlink({
    ...opts,
    args: {
      text: (text || def.title).replace(/COMMA/, ""),
      url: `/about/${def.slug}`,
    },
  });
};
