import { DesdemonaDefinition } from "./_types";

const desdemonaFlow: DesdemonaDefinition["flow"] = {
  endGame: {
    dominance: {
      who: {
        ifelse: [
          { morethan: [{ sizeof: "mystones" }, { sizeof: "oppstones" }] },
          ["player"],
          {
            ifelse: [
              { morethan: [{ sizeof: "oppstones" }, { sizeof: "mystones" }] },
              ["otherplayer"],
              0,
            ],
          },
        ],
      },
      show: {
        ifelse: [
          { morethan: [{ sizeof: "mystones" }, { sizeof: "oppstones" }] },
          "mystones",
          {
            ifelse: [
              { morethan: [{ sizeof: "oppstones" }, { sizeof: "mystones" }] },
              "oppstones",
              ["empty"],
            ],
          },
        ],
      },
      whenStarvation: true,
      condition: ["true"],
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffects: [
        {
          setturnpos: [
            "movedto",
            { firsttruthy: ["selectcapturestart", "selectmovetarget"] },
          ],
        },
        {
          moveat: [
            { firsttruthy: ["selectcapturer", "selectunit"] },
            { firsttruthy: ["selectcapturestart", "selectmovetarget"] },
          ],
        },
      ],
      runGenerators: [
        { if: [{ isempty: "capturers" }, "findspawntargets"] },
        "findcapturetargets",
      ],
      link: {
        ifrulesetelse: [
          "pie",
          {
            playercase: [
              { ifelse: [["isFirstTurn"], "endTurn", "selectfiretarget"] },
              "selectfiretarget",
            ],
          },
          "selectfiretarget",
        ],
      },
    },
    fire: {
      applyEffects: [
        { spawnat: ["selectfiretarget", "stones"] },
        { adoptin: ["victims"] },
      ],
      purge: ["capturers", "capturestarts", "movetargets"],
      runGenerators: [
        "findoppmovers",
        {
          if: [
            { isempty: "oppmovers" },
            {
              multi: [
                "findreachablesquares",
                "findcapturestarts",
                "findcapturers",
              ],
            },
          ],
        },
      ],
      link: {
        ifelse: [
          { and: [{ notempty: "capturers" }, { isempty: "oppmovers" }] },
          "selectcapturer",
          "endTurn",
        ],
      },
    },
  },
  marks: {
    selectunit: {
      from: "myamazons",
      runGenerators: [
        "findmovetargets",
        { if: [["false"], "findcapturers"] },
        { if: [["false"], "findcapturestarts"] },
      ],
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
    selectfiretarget: {
      from: "firetargets",
      runGenerator: {
        if: [{ anyat: ["capturespot", "selectfiretarget"] }, "findvictims"],
      },
      link: "fire",
    },
    selectcapturer: {
      from: "capturers",
      runGenerator: "findmovetargets",
      link: "selectcapturestart",
    },
    selectcapturestart: {
      from: { intersect: ["capturestarts", "movetargets"] },
      link: "move",
    },
  },
};

export default desdemonaFlow;
