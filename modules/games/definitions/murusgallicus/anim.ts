import { MurusgallicusAnim } from './_types';

const murusgallicusAnim: MurusgallicusAnim = {
  move: [
    { forposin: ["madewalls", { enterfrom: [["looppos"], "selecttower"] }] },
    {
      forposin: [
        "madetowers",
        { ghost: ["selecttower", ["looppos"], "walls", ["player"]] },
      ],
    },
  ],
  crush: [{ ghost: ["selecttower", "selectcrush", "walls", ["player"]] }],
};

export default murusgallicusAnim;
