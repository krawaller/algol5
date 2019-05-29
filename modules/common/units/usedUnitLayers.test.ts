import { FullDefAnon } from "../../types";
import { usedUnitLayers, emptyFullDef } from "..";

import aries from "../../games/definitions/aries";

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
    expected: ["units"],
    desc: "When nothing is referenced, we still get units."
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
    expected: ["huppets", "neutralmuppets", "units"]
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
    expected: ["huppets", "mymuppets", "oppmuppets", "units"],
    desc: "must always include my-opp combinations"
  },
  {
    def: aries,
    expected: ["units", "myunits", "oppunits"]
  }
];

test("usedUnitLayers", () =>
  unitLayerTests.forEach(({ def, expected }) =>
    expect(usedUnitLayers(def).sort()).toEqual(expected.sort())
  ));
