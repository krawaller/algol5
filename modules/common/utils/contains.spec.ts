import * as test from "tape";
import { contains } from "../";

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

test("contains", t => {
  containsTests.forEach(({ haystack, needle, found }) => {
    t.equal(
      contains(haystack, needle),
      found,
      `${JSON.stringify(haystack)} contains ${JSON.stringify(
        needle
      )} is ${JSON.stringify(found)}`
    );
  });
  t.end();
});
