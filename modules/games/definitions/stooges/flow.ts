import { StoogesDefinition } from "./_types";

const stoogesFlow: StoogesDefinition["flow"] = {
  endGame: {
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
    },
  },
  startTurn: {
    links: [
      { if: [{ falsy: { battlevar: "doubleswap" } }, "selectsingle"] },
      "selectdouble",
    ],
  },
  commands: {
    move: {
      applyEffects: [
        { moveat: ["selectmovetarget", "selectdouble"] },
        { moveat: ["selectdouble", "selectmovetarget"] },
        { setbattlevar: ["doubleswap", 0] },
        { setbattlevar: ["lastswap", 0] },
      ],
      runGenerator: "findwinline",
      link: "endTurn",
    },
    swap: {
      applyEffects: [
        {
          adoptat: [
            "selectsingle",
            {
              ifelse: [
                { anyat: ["myunits", "selectsingle"] },
                ["otherplayer"],
                ["player"],
              ],
            },
          ],
        },
        {
          if: [
            { truthypos: { battlepos: "lastswap" } },
            { setbattlevar: ["doubleswap", 1] },
          ],
        },
        { setbattlepos: ["lastswap", "selectsingle"] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectsingle: {
      from: { exceptpos: ["singles", { battlepos: "lastswap" }] },
      link: "swap",
    },
    selectdouble: {
      from: "mydoubles",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default stoogesFlow;
