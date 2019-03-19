import * as test from "tape";
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

test("unitLayers", t => {
  unitLayerTests.forEach(({ def, expected }) =>
    t.deepEqual(
      emptyUnitLayers(def),
      expected,
      `Correctly calculates unit layers for ${JSON.stringify(
        def.graphics.icons
      )}`
    )
  );
  t.end();
});
