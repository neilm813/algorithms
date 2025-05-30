const functions = require(".");

Object.values(functions).forEach((testFn) => {
  describe(testFn.name, () => {
    const test1 = [
      "dig1 8 1 5 1",
      "let1 art can",
      "dig2 3 6",
      "let2 own kit dig",
      "let3 art zero",
    ];
    const expected1 = [
      "let1 art can",
      "let3 art zero",
      "let2 own kit dig",
      "dig1 8 1 5 1",
      "dig2 3 6",
    ];

    const test2 = [
      "a1 9 2 3 1",
      "g1 act car",
      "zo4 4 7",
      "ab1 off key dog",
      "a8 act zoo",
    ];
    const expected2 = [
      "g1 act car",
      "a8 act zoo",
      "ab1 off key dog",
      "a1 9 2 3 1",
      "zo4 4 7",
    ];

    const testCases = [
      { args: [test1], expected: expected1 },
      { args: [test2], expected: expected2 },
    ];

    testCases.forEach(({ args, expected, description }) => {
      describe("when given " + description, () => {
        const outputArr = testFn(...args);

        it("should order the logs first by letter log content alphabetically and then digit logs after in their original order.", () => {
          expect(outputArr).toEqual(expected);
        });
      });
    });
  });
});
