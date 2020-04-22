import { PaperneutronDefinition } from "./_types";

const paperneutronFlow: PaperneutronDefinition["flow"] = {
  endGame: {
    goal: {
      condition: { overlaps: ["neutralsoldiers", "mybase"] },
      show: { intersect: ["mybase", "neutralsoldiers"] },
    },
    suicide: {
      condition: { overlaps: ["neutralsoldiers", "oppbase"] },
      who: ["otherplayer"],
      show: { intersect: ["oppbase", "neutralsoldiers"] },
    },
  },
  startTurn: {
    link: {
      playercase: [
        { ifelse: [["isFirstTurn"], "selectmyunit", "selectfirstneutron"] },
        "selectfirstneutron",
      ],
    },
  },
  commands: {
    slide: {
      applyEffects: [
        {
          moveat: [
            {
              firsttruthy: [
                "selectmyunit",
                { turnpos: "nextneutron" },
                "selectfirstneutron",
              ],
            },
            {
              firsttruthy: [
                "selectmyunittarget",
                "selectsecondneutrontarget",
                "selectfirstneutrontarget",
              ],
            },
          ],
        },
        {
          if: [
            { falsypos: "selectmyunit" },
            {
              ifelse: [
                { truthypos: { turnpos: "nextneutron" } },
                { setturnvar: ["neutronsdone", 1] },
                {
                  setturnpos: [
                    "nextneutron",
                    {
                      onlyin: {
                        exceptpos: ["neutralsoldiers", "selectfirstneutron"],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      runGenerator: {
        if: [
          {
            and: [
              { truthypos: { turnpos: "nextneutron" } },
              { falsypos: "selectmyunit" },
            ],
          },
          "findsecondneutrontargets",
        ],
      },
      link: {
        ifelse: [
          { truthypos: "selectmyunit" },
          "endTurn",
          {
            ifelse: [
              { truthypos: "selectsecondneutrontarget" },
              "selectmyunit",
              "selectsecondneutrontarget",
            ],
          },
        ],
      },
    },
  },
  marks: {
    selectfirstneutrontarget: {
      from: "firstneutrontargets",
      link: "slide",
    },
    selectsecondneutrontarget: {
      from: "secondneutrontargets",
      link: "slide",
    },
    selectmyunittarget: {
      from: "myunittargets",
      link: "slide",
    },
    selectmyunit: {
      from: "myunits",
      runGenerator: "findmyunittargets",
      link: "selectmyunittarget",
    },
    selectfirstneutron: {
      from: "neutralunits",
      runGenerator: "findfirstneutrontargets",
      link: "selectfirstneutrontarget",
    },
  },
};

export default paperneutronFlow;
