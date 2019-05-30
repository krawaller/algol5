import { MurusgallicusadvancedAnim } from './_types';

const murusgallicusadvancedAnim: MurusgallicusadvancedAnim = {
  sacrifice: [{ exitto: ["selecttower", "selectcrush"] }],
  crush: [{ ghost: ["selecttower", "selectcrush", "walls", ["player"]] }],
  move: [
    { forposin: ["madewalls", { enterfrom: [["looppos"], "selecttower"] }] },
    {
      forposin: [
        "madetowers",
        { ghost: ["selecttower", ["looppos"], "walls", ["player"]] },
      ],
    },
    {
      forposin: [
        "madecatapults",
        { ghost: ["selecttower", ["looppos"], "walls", ["player"]] },
      ],
    },
  ],
  fire: [
    {
      ifelse: [
        { noneat: ["oppunits", "selectfire"] },
        { enterfrom: ["selectfire", "selectcatapult"] },
        { ghost: ["selectcatapult", "selectfire", "walls", ["player"]] },
      ],
    },
  ],
};

export default murusgallicusadvancedAnim;
