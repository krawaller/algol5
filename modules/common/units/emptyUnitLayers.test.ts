import { FullDefAnon } from "../../types";
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
      }
    },
    expected: {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      muppets: {},
      mymuppets: {},
      oppmuppets: {},
      neutralmuppets: {},
      huppets: {},
      myhuppets: {},
      opphuppets: {},
      neutralhuppets: {}
    }
  }
];

test("unitLayers", () =>
  unitLayerTests.forEach(({ def, expected }) =>
    expect(emptyUnitLayers(def)).toEqual(expected)
  ));
