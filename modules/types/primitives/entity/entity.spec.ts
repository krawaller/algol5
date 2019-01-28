import { AlgolEntity } from "./";

type TestPosition = "a1" | "b2" | "c3" | "d4";

type TestEntity = AlgolEntity<TestPosition>;

const testEntities: TestEntity[] = [
  "c3",
  { sites: ["a1", "c3", "d4"] },
  { datasites: [{ foo: "bar" }, "b2", "d4", "a1"] },
  { rect: ["a1", "b2"] },
  { datarect: [{ foo: "bar" }, "b2", "d4"] },
  { holerect: ["a1", "c3", "b2"] },
  { dataholerect: [{ baz: 777 }, "a1", "c3", "b2"] }
];
