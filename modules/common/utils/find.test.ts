import { find, Find } from "./find";

type FindTest = {
  haystack: any;
  needle: any;
  found: Find[];
};

const findTests: FindTest[] = [
  { haystack: [1, 2, 3], needle: 2, found: [{ value: 2, path: ["1"] }] },
  {
    haystack: [1, { a: ["x", { foo: "BAR" }] }],
    needle: "BAR",
    found: [{ value: "BAR", path: ["1", "a", "1", "foo"] }]
  },
  { haystack: [1, { a: ["x", { foo: "BAR" }] }], needle: "baz", found: [] }
];

test("find", () =>
  findTests.forEach(({ haystack, needle, found }) =>
    expect(find(haystack, needle)).toEqual(found)
  ));
