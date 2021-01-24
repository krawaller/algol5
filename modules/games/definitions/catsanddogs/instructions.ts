import { CatsanddogsDefinition } from "./_types";

const catsanddogsInstructions: CatsanddogsDefinition["instructions"] = {
  startTurn: {
    line: ["Select where to deploy", 'animals', {
      ifplayer: [
        1,
        {
          if: [
            ["isFirstTurn"],
            {
              line: [
                "(but you can't deploy to",
                { pos: { onlyin: "center" } },
                "on the 1st turn)",
              ],
            },
          ],
        },
      ],
    }]
  },
  "selectdeploytarget": {
    line: [
      "Press",
      "deploy",
      "to spawn",
      { unittypepos: ["animals", ['player'], "selectdeploytarget"] },

    ]
  },
};

export default catsanddogsInstructions;
