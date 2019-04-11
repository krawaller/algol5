import { FullDefAnon } from "../../types";
import { usedUnitLayers, emptyFullDef } from "..";

type UnitLayerTest = {
  def: FullDefAnon;
  expected: string[];
  desc?: string;
};

const muppetsHuppetsDef: FullDefAnon = {
  ...emptyFullDef,
  graphics: {
    ...emptyFullDef.graphics,
    icons: {
      muppets: "king",
      huppets: "pawn"
    }
  }
};

const unitLayerTests: UnitLayerTest[] = [
  {
    def: muppetsHuppetsDef,
    expected: [],
    desc: "When nothing is referenced, we get nothing!"
  },
  {
    def: {
      ...muppetsHuppetsDef,
      flow: {
        ...muppetsHuppetsDef.flow,
        endGame: {
          gnurp: {
            condition: {
              or: [{ isempty: "huppets" }, { isempty: "neutralmuppets" }]
            }
          }
        }
      }
    },
    expected: ["huppets", "neutralmuppets"]
  },
  {
    def: {
      ...muppetsHuppetsDef,
      flow: {
        ...muppetsHuppetsDef.flow,
        endGame: {
          gnurp: {
            condition: {
              or: [{ isempty: "huppets" }, { isempty: "mymuppets" }]
            }
          }
        }
      }
    },
    expected: ["huppets", "mymuppets", "oppmuppets"],
    desc: "must always include my-opp combinations"
  }
];

test("usedUnitLayers", () =>
  unitLayerTests.forEach(({ def, expected }) =>
    expect(usedUnitLayers(def).sort()).toEqual(expected)
  ));
