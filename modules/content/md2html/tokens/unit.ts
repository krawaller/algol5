import { TokenHandler } from "./_handler";
import lib from "../../../games/dist/lib";
import { allIcons } from "../../../graphics/dist/allIconSVGs";

// Takes an UNIT token and turns it into an SVG pic! Expects args `group` and `owner`,
// and optionally gameId and pos

export const unit: TokenHandler = opts => {
  const { args, gameId: thisGameId } = opts;
  let { group, owner, gameId, pos } = args;
  if (!gameId) {
    if (thisGameId) {
      gameId = thisGameId;
    } else {
      throw new Error(
        "Cannot refer unit group without providing gameId when there is no contextual id!"
      );
    }
  }
  const def = lib[gameId];
  if (!group) {
    const groups = Object.keys(def.graphics.icons);
    if (groups.length === 1) {
      group = groups[0];
    } else {
      throw new Error(
        "Have to provide unit group since there is more than 1 in the game"
      );
    }
  }
  const icon = def.graphics.icons[group as keyof typeof def.graphics.icons];
  if (!icon) {
    throw new Error(`No group "${group}" in graphics for ${gameId} `);
  }
  if (!owner) {
    owner = "12";
  }
  const okOwners = ["0", "1", "2", "01", "02", "12"];
  if (!okOwners.includes(owner)) {
    throw new Error(
      `Illegal owner "${owner}", must be one of ${okOwners.join(",")}`
    );
  }
  const svg = allIcons[`${icon}${owner}SVG` as keyof typeof allIcons];
  const innerHtml = `<span class="md-icon-svg">\n${svg}\n</span>`;
  if (!pos) {
    return innerHtml;
  }
  return `<span class="md-pos-with-unit" data-pos="${pos}">${pos} ${innerHtml}</span>`;
};
