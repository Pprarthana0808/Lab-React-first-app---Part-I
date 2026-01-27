const myFunctions = require("./functions.js");

test("div: divides two positive numbers", () => {
  expect(myFunctions.div(10, 2)).toBe(5);
});

test("div: returns a decimal when needed", () => {
  expect(myFunctions.div(5, 2)).toBe(2.5);
});

test("div: negative divided by positive is negative", () => {
  expect(myFunctions.div(-9, 3)).toBe(-3);
});

test("div: 0 divided by a number is 0", () => {
  expect(myFunctions.div(0, 7)).toBe(0);
});

test("div: division by 0 returns Infinity in JavaScript", () => {
  expect(myFunctions.div(7, 0)).toBe(Infinity);
});

test("containsNumbers: returns true when text contains a digit", () => {
  expect(myFunctions.containsNumbers("abc1xyz")).toBe(true);
});

test("containsNumbers: returns true when text starts with a digit", () => {
  expect(myFunctions.containsNumbers("1abc")).toBe(true);
});

test("containsNumbers: returns true when text is only digits", () => {
  expect(myFunctions.containsNumbers("12345")).toBe(true);
});

test("containsNumbers: returns false when text has no digits", () => {
  expect(myFunctions.containsNumbers("abcdef")).toBe(false);
});

test("containsNumbers: returns false for empty string", () => {
  expect(myFunctions.containsNumbers("")).toBe(false);
});

// bug-catching tests (should FAIL with the buggy implementation)
  test("containsNumbers BUG: whitespace-only should be false", () => {
  expect(myFunctions.containsNumbers("   ")).toBe(false);
});

test("containsNumbers BUG: letters + spaces only should be false", () => {
  expect(myFunctions.containsNumbers("a b c")).toBe(false);
});
