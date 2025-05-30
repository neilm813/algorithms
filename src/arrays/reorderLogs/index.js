// Keebler health interview

/**
  	Reorders log files according to the following rules:
      	1. Letter-logs come before digit-logs.
      	2. Letter-logs are sorted lexicographically by their content.
         	If the content is identical, they are sorted by their identifier.
      	3. Digit-logs remain in their original order.

    	There are two types of logs:

    	Letter-logs: All words (except the identifier) consist of lowercase English letters.
    	Digit-logs: All words (except the identifier) consist of digits.

    	Constraints:
      	1 <= logs.length <= 100
      	3 <= logs[i].length <= 100
      	All the tokens of logs[i] are separated by a single space.
      	logs[i] is guaranteed to have an identifier and at least one word after the identifier.

  	Parameters:
      	logs (List[str]): A list of log entries, each consisting of an identifier
                        	and content.

  	Returns:
      	List[str]: The reordered list of log entries.
 */

function isDigitLog(log) {
  const parts = log.split(" ");
  const isNumber = !isNaN(parts[1]);
  return isNumber;
}

function reorderLogFiles(logs) {
  const digitLogs = logs.filter(isDigitLog);
  const alphabeticalLetterLogs = logs
    .filter((log) => !isDigitLog(log))
    .sort((a, b) => {
      const aContent = a.split(" ").slice(1).join(" ");
      const bContent = b.split(" ").slice(1).join(" ");
      return aContent.localeCompare(bContent);
    });

  return alphabeticalLetterLogs.concat(digitLogs);
}

module.exports = {
  reorderLogFiles,
};

/* ----------- Quick self-test (mirrors your asserts) ----------- */
console.assert(
  JSON.stringify(
    reorderLogFiles([
      "dig1 8 1 5 1",
      "let1 art can",
      "dig2 3 6",
      "let2 own kit dig",
      "let3 art zero",
    ])
  ) ===
    JSON.stringify([
      "let1 art can",
      "let3 art zero",
      "let2 own kit dig",
      "dig1 8 1 5 1",
      "dig2 3 6",
    ]),
  "Test case 1 failed"
);

console.assert(
  JSON.stringify(
    reorderLogFiles([
      "a1 9 2 3 1",
      "g1 act car",
      "zo4 4 7",
      "ab1 off key dog",
      "a8 act zoo",
    ])
  ) ===
    JSON.stringify([
      "g1 act car",
      "a8 act zoo",
      "ab1 off key dog",
      "a1 9 2 3 1",
      "zo4 4 7",
    ]),
  "Test case 2 failed"
);
