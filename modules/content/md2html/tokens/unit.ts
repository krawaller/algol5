import { TokenHandler } from "./_symbol";
import lib from "../../../games/dist/lib";
import { allIcons } from "../../../graphics/dist/allIconSVGs";

// Takes an UNIT token and turns it into an SVG pic! Expects args `group` and `owner`

export const unit: TokenHandler = opts => {
  const { args, gameId } = opts;
  const { group, owner } = args;
  const def = lib[gameId];
  if (!group) {
    throw new Error("Have to provide unit group");
  }
  const icon = def.graphics.icons[group as keyof typeof def.graphics.icons];
  if (!icon) {
    throw new Error(`No group "${group}" in graphics for ${gameId} `);
  }
  if (!owner) {
    throw new Error(`Have to provide unit owner`);
  }
  if (owner !== "0" && owner !== "1" && owner !== "2") {
    throw new Error(`Illegal owner "${owner}", must be 0/1/2!`);
  }
  const svg = allIcons[`${icon}${owner}SVG` as keyof typeof allIcons];
  return `<span class="icon-svg">\n${svg}\n</span>`;
};
