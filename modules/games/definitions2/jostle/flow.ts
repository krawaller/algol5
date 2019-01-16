import { JostleFlow } from "./_types";

const jostleFlow: JostleFlow = {
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "mycheckers",
      runGenerator: "findinitial",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findnew",
      link: {
        if: [
          {
            morethan: [
              {
                minus: [
                  { sizeof: "newfriend" },
                  { sum: [1, { sizeof: "newenemy" }] }
                ]
              },
              {
                minus: [{ sizeof: "initialfriend" }, { sizeof: "initialenemy" }]
              }
            ]
          },
          "jostle"
        ]
      }
    }
  },
  commands: {
    jostle: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      link: "endturn"
    }
  }
};

export default jostleFlow;
