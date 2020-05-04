import { CampaignDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const campaignBoardBook: CampaignDefinition["boards"] = {
  basic: {
    height: 10,
    width: 10,
    terrain: {},
    offset: "knight",
  },
};

export default campaignBoardBook;
