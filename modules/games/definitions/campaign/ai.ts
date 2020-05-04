// AI is not yet reimplemented in the new engine. Never mind this file, for now! :)

import { CampaignDefinition } from "./_types";
type CampaignAI = any; // CampaignDefinition['AI']

const campaignAI: CampaignAI = {
  brains: {},
  generators: {},
  aspects: {},
  grids: {},
  terrain: {}
};

export default campaignAI;
