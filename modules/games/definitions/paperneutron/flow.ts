import { PaperneutronDefinition } from "./_types";

const paperneutronFlow: PaperneutronDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  commands: {
    slide: {
      applyEffects: [
        { moveat: ["selectunit", "selectslidetarget"] },
        {
          if: [
            { anyat: ["neutralunits", "selectunit"] },
            {
              ifelse: [
                { truthy: { turnvar: "firstneutron" } },
                { setturnpos: ["secondneutron", "selectslidetarget"] },
                { setturnpos: ["firstneutron", "selectslidetarget"] },
              ],
            },
          ],
        },
      ],
      link: {
        ifelse: [
          { anyat: ["myunits", "selectslidetarget"] },
          "endTurn",
          "selectunit",
        ],
      },
    },
  },
  marks: {
    selectslidetarget: {
      from: "slidetargets",
      link: "slide",
    },
    selectunit: {
      from: {
        playercase: [
          {
            ifelse: [
              {
                or: [
                  { same: [["turn"], 1] },
                  { truthy: { turnvar: "secondneutron" } },
                ],
              },
              "myunits",
              {
                exceptpos: ["neutralunits", { turnpos: "firstneutron" }],
              },
            ],
          },
          {
            ifelse: [
              { truthy: { turnvar: "secondneutron" } },
              "myunits",
              {
                exceptpos: ["neutralunits", { turnpos: "firstneutron" }],
              },
            ],
          },
        ],
      },
      runGenerator: "findslidetargets",
      link: "selectslidetarget",
    },
  },
};

export default paperneutronFlow;
