import { FullDefAnon } from "algol-types";
import { emptyUnitLayers, emptyFullDef } from "..";

type UnitLayerTest = {
  def: FullDefAnon;
  expected: {
    [unitName: string]: {
      [pos: string]: { [prop: string]: string | number };
    };
  };
};

const unitLayerTests: UnitLayerTest[] = [
  {
    def: {
      ...emptyFullDef,
      graphics: {
        ...emptyFullDef.graphics,
        icons: {
          muppets: "king",
          huppets: "pawn"
        }
      },
      flow: {
        ...emptyFullDef.flow,
        endGame: {
          gnurp: {
            condition: {
              isempty: {
                union: ["myhuppets", "oppunits", "neutralmuppets", "muppets"]
              }
            }
          }
        }
      }
    },
    expected: {
      units: {},
      myunits: {},
      oppunits: {},
      muppets: {},
      neutralmuppets: {},
      myhuppets: {},
      opphuppets: {}
    }
  }
];

test("unitLayers", () =>
  unitLayerTests.forEach(({ def, expected }) =>
    expect(emptyUnitLayers(def)).toEqual(expected)
  ));
