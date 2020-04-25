import { NeutronDefinition } from "./_types";

const neutronFlow: NeutronDefinition["flow"] = {
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
    runGenerator: {
      ifruleset: ["basic", "findsingleneutrontarget"],
    },
    link: {
      playercase: [
        {
          ifelse: [
            ["isFirstTurn"],
            "selectunit",
            {
              ifrulesetelse: [
                "basic",
                "selectsingleneutrontarget",
                "selectfirstneutron",
              ],
            },
          ],
        },
        {
          ifrulesetelse: [
            "basic",
            "selectsingleneutrontarget",
            "selectfirstneutron",
          ],
        },
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
                "selectunit",
                { turnpos: "nextneutron" },
                "selectfirstneutron",
                { onlyin: "neutralunits" },
              ],
            },
            {
              firsttruthy: [
                "selectmytarget",
                "selectsecondneutrontarget",
                "selectfirstneutrontarget",
                "selectsingleneutrontarget",
              ],
            },
          ],
        },
        {
          ifruleset: [
            "paperneutron",
            {
              if: [
                { falsypos: "selectunit" },
                {
                  ifelse: [
                    { truthypos: { turnpos: "nextneutron" } },
                    { setturnvar: ["neutronsdone", 1] },
                    {
                      setturnpos: [
                        "nextneutron",
                        {
                          onlyin: {
                            exceptpos: [
                              "neutralsoldiers",
                              "selectfirstneutron",
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      runGenerator: {
        ifruleset: [
          "paperneutron",
          {
            if: [
              {
                and: [
                  { truthypos: { turnpos: "nextneutron" } },
                  { falsypos: "selectunit" },
                ],
              },
              "findsecondneutrontargets",
            ],
          },
        ],
      },
      link: {
        ifelse: [
          { truthypos: "selectunit" },
          "endTurn",
          {
            ifrulesetelse: [
              "paperneutron",
              {
                ifelse: [
                  { truthypos: "selectsecondneutrontarget" },
                  "selectunit",
                  "selectsecondneutrontarget",
                ],
              },
              "selectunit",
            ],
          },
        ],
      },
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmytargets",
      link: "selectmytarget",
    },
    selectmytarget: {
      from: "mytargets",
      link: "slide",
    },
    selectfirstneutron: {
      from: "neutralunits",
      runGenerator: "findfirstneutrontargets",
      link: "selectfirstneutrontarget",
    },
    selectsingleneutrontarget: {
      from: "singleneutrontargets",
      link: "slide",
    },
    selectfirstneutrontarget: {
      from: "firstneutrontargets",
      link: "slide",
    },
    selectsecondneutrontarget: {
      from: "secondneutrontargets",
      link: "slide",
    },
  },
};

export default neutronFlow;
