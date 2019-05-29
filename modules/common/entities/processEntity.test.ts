import { processEntity, ProcessedEntity } from "..";
import { AlgolEntityAnon } from "../../types";

type EntityTest = {
  entity: AlgolEntityAnon;
  expected: ProcessedEntity[];
};

const processEntityTests: EntityTest[] = [
  { entity: "a1", expected: [{ pos: "a1", x: 1, y: 1 }] },
  {
    entity: { sites: ["b2", "d5"] },
    expected: [{ pos: "b2", x: 2, y: 2 }, { pos: "d5", x: 4, y: 5 }]
  },
  {
    entity: { datasites: [{ bar: "baz" }, "b2", "d5"] },
    expected: [
      { pos: "b2", x: 2, y: 2, bar: "baz" },
      { pos: "d5", x: 4, y: 5, bar: "baz" }
    ]
  },
  {
    entity: { rect: ["c2", "e3"] },
    expected: [
      { pos: "c2", x: 3, y: 2 },
      { pos: "c3", x: 3, y: 3 },
      { pos: "d2", x: 4, y: 2 },
      { pos: "d3", x: 4, y: 3 },
      { pos: "e2", x: 5, y: 2 },
      { pos: "e3", x: 5, y: 3 }
    ]
  },
  {
    entity: { datarect: [{ baz: "bin" }, "c2", "e3"] },
    expected: [
      { pos: "c2", x: 3, y: 2, baz: "bin" },
      { pos: "c3", x: 3, y: 3, baz: "bin" },
      { pos: "d2", x: 4, y: 2, baz: "bin" },
      { pos: "d3", x: 4, y: 3, baz: "bin" },
      { pos: "e2", x: 5, y: 2, baz: "bin" },
      { pos: "e3", x: 5, y: 3, baz: "bin" }
    ]
  },
  {
    entity: { holerect: ["c2", "e3", "d3", "c2"] },
    expected: [
      { pos: "c3", x: 3, y: 3 },
      { pos: "d2", x: 4, y: 2 },
      { pos: "e2", x: 5, y: 2 },
      { pos: "e3", x: 5, y: 3 }
    ]
  },
  {
    entity: { dataholerect: [{ foo: "bar" }, "c2", "e3", "d3", "e2"] },
    expected: [
      { pos: "c2", x: 3, y: 2, foo: "bar" },
      { pos: "c3", x: 3, y: 3, foo: "bar" },
      { pos: "d2", x: 4, y: 2, foo: "bar" },
      { pos: "e3", x: 5, y: 3, foo: "bar" }
    ]
  }
];

test("processEntity", () => {
  processEntityTests.forEach(({ entity, expected }) =>
    expect(processEntity(entity)).toEqual(expected)
  );
});
