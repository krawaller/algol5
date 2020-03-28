import { KingsvalleyDefinition } from "./_types";

const kingsvalleyVariants: KingsvalleyDefinition["variants"] = [
  {
    ruleset: "basic",
    board: "basic",
    setup: "basic",
    desc: "regular",
    code: "r",
  },
  {
    ruleset: "basic",
    board: "basic",
    setup: "retrieve",
    desc: "retrieve",
    code: "e",
  },
  {
    ruleset: "basic",
    board: "labyrinth",
    setup: "labyrinth",
    desc: "labyrinth",
    code: "k",
  },
];

export default kingsvalleyVariants;
