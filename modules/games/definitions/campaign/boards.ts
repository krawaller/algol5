import { CampaignDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const campaignBoardBook: CampaignDefinition["boards"] = {
  basic: {
    height: 10,
    width: 10,
    terrain: {
      center: ["e5", "e6", "f5", "f6"],
    },
    offset: "knight",
  },
};

export default campaignBoardBook;
