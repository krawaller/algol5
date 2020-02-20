import { TokenHandler } from "./_handler";
import lib from "../../../games/dist/lib";
import { allIcons } from "../../../graphics/dist/allIconSVGs";

// Takes an UNIT token and turns it into an SVG pic! Expects args `group` and `who`,
// and optionally gameId and at

export const unit: TokenHandler = opts => {
  const { args, gameId: thisGameId } = opts;
  let { group, who, gameId, at } = args;
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
  if (!who) {
    who = "12";
  }
  const okOwners = ["0", "1", "2", "01", "02", "12"];
  if (!okOwners.includes(who)) {
    throw new Error(
      `Illegal 'who' "${who}", must be one of ${okOwners.join(",")}`
    );
  }
  const svg = allIcons[`${icon}${who}SVG` as keyof typeof allIcons];
  const innerHtml = `<span class="md-icon-svg">\n${svg}\n</span>`;
  if (!at) {
    return innerHtml;
  }
  return `<span class="md-pos-with-unit" data-pos="${at}">${at} ${innerHtml}</span>`;
};
