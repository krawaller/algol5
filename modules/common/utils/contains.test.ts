import { contains } from "..";

type ContainsTest = {
  haystack: any;
  needle: any;
  found: boolean;
};

const containsTests: ContainsTest[] = [
  { haystack: [1, 2, 3], needle: 2, found: true },
  { haystack: [1, { a: ["x", { foo: "BAR" }] }], needle: "BAR", found: true },
  { haystack: [1, { a: ["x", { foo: "BAR" }] }], needle: "baz", found: false },
  {
    haystack: [1, { a: ["x", { foo: "BAR" }] }],
    needle: { foo: "BAR" },
    found: true
  },
  {
    haystack: [1, { a: ["x", { foo: "BUZ" }] }],
    needle: { foo: "BAR" },
    found: false
  }
];

test("contains", () =>
  containsTests.forEach(({ haystack, needle, found }) =>
    expect(contains(haystack, needle)).toEqual(found)
  ));
