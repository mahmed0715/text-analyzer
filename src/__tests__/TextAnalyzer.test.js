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

describe('TextAnalyzer - Edge Cases', () => {
  it('should return 0 for empty string', () => {
    const text = '';
    expect(TextAnalyzer.countWords(text)).toBe(0);
    expect(TextAnalyzer.countCharacters(text)).toBe(0);
    expect(TextAnalyzer.countSentences(text)).toBe(0);
    expect(TextAnalyzer.countParagraphs(text)).toBe(0);
    expect(TextAnalyzer.findLongestWords(text)).toEqual([]);
  });

  it('should return 0 for text with only whitespace', () => {
    const text = '     \n   \n   ';
    expect(TextAnalyzer.countWords(text)).toBe(0);
    expect(TextAnalyzer.countCharacters(text)).toBe(0);
    expect(TextAnalyzer.countSentences(text)).toBe(0);
    expect(TextAnalyzer.countParagraphs(text)).toBe(0);
    expect(TextAnalyzer.findLongestWords(text)).toEqual([]);
  });

  it('should return longest word even when all words are the same length', () => {
    const text = 'dog cat rat bat';
    expect(TextAnalyzer.findLongestWords(text)).toEqual(['dog']);
  });

  it('should return first longest word if multiple words have same max length', () => {
    const text = 'one two three four five';
    expect(TextAnalyzer.findLongestWords(text)).toEqual(['three']);
  });

 
  it('should treat punctuation-only paragraph as a valid paragraph', () => {
    const text = '\n\n...\n\n';
    expect(TextAnalyzer.countParagraphs(text)).toBe(1); // ✅ Fix here
    expect(TextAnalyzer.countSentences(text)).toBe(1);
    expect(TextAnalyzer.countWords(text)).toBe(1);
    expect(TextAnalyzer.findLongestWords(text)).toEqual(['']);
  });
  
});
