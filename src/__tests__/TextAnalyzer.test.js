// __tests__/TextAnalyzer.test.ts
const { TextAnalyzer }  = require('../services/text-analyzer');

describe('TextAnalyzer', () => {
  test('counts words correctly', () => {
    expect(TextAnalyzer.countWords("this is a test")).toBe(4);
  });

  test('counts characters correctly', () => {
    expect(TextAnalyzer.countCharacters("this is a test")).toBe(11);
  });

  test('counts sentences correctly', () => {
    expect(TextAnalyzer.countSentences("This is one. This is two!")).toBe(2);
  });

  test('counts paragraphs correctly', () => {
    const text = "Para one.\n\nPara two.";
    expect(TextAnalyzer.countParagraphs(text)).toBe(2);
  });

  test('finds longest word per paragraph', () => {
    const text = "one two three\n\nlongestword here";
    expect(TextAnalyzer.findLongestWords(text)).toEqual(['three', 'longestword']);
  });
});
