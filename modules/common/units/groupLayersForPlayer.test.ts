import { FullDefAnon } from "../../types";
import { groupLayersForPlayer, emptyFullDef } from "..";

type UnitLayerTest = {
  def: FullDefAnon;
  player: 1 | 2;
  expected: { [group: string]: [string[], string[], string[]] };
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
    player: 1,
    expected: {
      muppets: [["units"], ["units"], ["units"]],
      huppets: [["units"], ["units"], ["units"]]
    },
    desc: "When nothing is referenced, we only get 'units'"
  },
  {
    def: {
      ...muppetsHuppetsDef,
      flow: {
        ...muppetsHuppetsDef.flow,
        endGame: {
          gnurp: {
            condition: {
              or: [{ isempty: "myhuppets" }, { isempty: "neutralmuppets" }]
            }
          }
        }
      }
    },
    player: 1,
    expected: {
      huppets: [["units"], ["units", "myhuppets"], ["units", "opphuppets"]],
      muppets: [["units", "neutralmuppets"], ["units"], ["units"]]
    }
  },
  {
    def: {
      ...muppetsHuppetsDef,
      flow: {
        ...muppetsHuppetsDef.flow,
        endGame: {
          gnurp: {
            condition: {
              or: [
                { isempty: "myhuppets" },
                { isempty: "neutralmuppets" },
                { isempty: "muppets" }
              ]
            }
          }
        }
      }
    },
    player: 2,
    expected: {
      huppets: [["units"], ["units", "opphuppets"], ["units", "myhuppets"]],
      muppets: [
        ["units", "muppets", "neutralmuppets"],
        ["units", "muppets"],
        ["units", "muppets"]
      ]
    }
  }
];

test("groupLayersForPlayer", () =>
  unitLayerTests.forEach(({ def, expected, player }) =>
    expect(groupLayersForPlayer(def, player)).toEqual(expected)
  ));
