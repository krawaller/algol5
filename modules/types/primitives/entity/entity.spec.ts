import { AlgolEntity } from "./";
import { AlgolTestBlob } from "../../blob";

type TestEntity = AlgolEntity<AlgolTestBlob>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testEntities: TestEntity[] = [
  "mypos",
  { sites: ["mypos"] },
  { datasites: [{ foo: "bar" }, "mypos", "mypos"] },
  { rect: ["mypos", "mypos"] },
  { datarect: [{ foo: "bar" }, "mypos", "mypos"] },
  { holerect: ["mypos", "mypos", "mypos"] },
  { dataholerect: [{ baz: 777 }, "mypos", "mypos", "mypos"] },
];
