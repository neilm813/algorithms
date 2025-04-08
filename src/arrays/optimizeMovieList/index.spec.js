const functions = require(".");

Object.values(functions).forEach((testFn) => {
  describe(testFn.name, () => {
    const movies1 = [];
    const duration1 = 275;
    const expected1 = {
      head: null,
    };

    const movies2 = null;
    const duration2 = 275;
    const expected2 = {
      head: null,
    };

    const movies3 = [
      { name: "Edge of Light", duration: 90, genre: "Sci-Fi" },
      { name: "Hearts Apart", duration: 88, genre: "Romance" },
      { name: "Galaxy Drift", duration: 95, genre: "Sci-Fi" },
      { name: "Love and Letters", duration: 92, genre: "Romance" },
      { name: "Silent Streets", duration: 85, genre: "Thriller" },
      { name: "Mythspire", duration: 86, genre: "Fantasy" },
      { name: "Laugh Track", duration: 80, genre: "Comedy" },
      { name: "Dark Alley", duration: 93, genre: "Thriller" },
      { name: "Funny Bones", duration: 89, genre: "Comedy" },
      { name: "Blade Pulse", duration: 94, genre: "Action" },
      { name: "Steel Rush", duration: 91, genre: "Action" },
      { name: "Winds of Eloria", duration: 90, genre: "Fantasy" },
    ];

    const testCases = [
      {
        args: [movies1, duration1],
        expected: expected1,
        description: "movies length of 0",
      },
      {
        args: [movies2, duration2],
        expected: expected2,
        description: "movies list is null",
      },
    ];

    testCases.forEach(({ args, expected, description }) => {
      describe("when given " + description, () => {
        it("should return a linked list of the most movies that can fit into the given maxDuration without the same genre back-to-back.", () => {
          expect(testFn(...args)).toEqual(expected);
        });
      });
    });
  });
});
