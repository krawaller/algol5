import { SetupAnon } from "algol-types";
import { deduceInitialUnitData } from "..";

type unitDataTest = {
  setup: SetupAnon;
  expected: {
    [unitid: string]: {
      [prop: string]: string | number;
    };
  };
};

const unitLayerTests: unitDataTest[] = [
  {
    setup: {
      dorks: {
        1: ["a1"],
        2: ["b1", { datasites: [{ strength: 3 }, "c1"] }]
      }
    },
    expected: {
      unit1: {
        id: "unit1",
        owner: 1,
        group: "dorks",
        pos: "a1",
        x: 1,
        y: 1
      },
      unit2: {
        id: "unit2",
        owner: 2,
        group: "dorks",
        pos: "b1",
        x: 2,
        y: 1
      },
      unit3: {
        id: "unit3",
        owner: 2,
        group: "dorks",
        pos: "c1",
        x: 3,
        y: 1,
        strength: 3
      }
    }
  }
];

test("deduceInitialUnitData", () =>
  unitLayerTests.forEach(({ setup, expected }) =>
    expect(deduceInitialUnitData(setup)).toEqual(expected)
  ));
