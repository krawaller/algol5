import { DuploAnim } from "./_types";

const duploAnim: DuploAnim = {
  expand: [
    {
      forposin: ["spawns", { enterfrom: [["looppos"], "selectunit"] }],
    },
    {
      if: [
        { anyat: ["units", "selecttarget"] },
        { ghost: ["selectunit", "selecttarget", "soldiers", ["player"]] },
      ],
    },
  ],
};

export default duploAnim;
