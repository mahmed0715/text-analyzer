import cache from "../utils/cache";

export class TextAnalyzer {
  static countWords(text: string): number {
    const key = `words-${text}`;
    const cached = cache.get<number>(key);
    if (cached !== undefined) return cached;
    const result = text.split(/\s+/).filter((word) => word.length > 0).length;
    cache.set(key, result);
    return result;
  }

  static countCharacters(text: string): number {
    const key = `characters-${text}`;
    const cached = cache.get<number>(key);
    if (cached !== undefined) return cached;
    const result = text.replace(/\s+/g, "").length;
    cache.set(key, result);
    return result;
  }

  static countSentences(text: string): number {
    const key = `sentenses-${text}`;
    const cached = cache.get<number>(key);
    if (cached !== undefined) return cached;
    const result = text
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    cache.set(key, result);
    return result;
  }

  static countParagraphs(text: string): number {
    const key = `sentenses-${text}`;
    const cached = cache.get<number>(key);
    if (cached !== undefined) return cached;
    const result = text
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;
    cache.set(key, result);
    return result;
  }

  static findLongestWords(text: string): string[] {
    const key = `longestWords-${text}`;
    const cached = cache.get<string[]>(key);
    if (cached !== undefined) return cached;

    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    const result = paragraphs.map((p) => {
      const words = p.split(/\s+/).filter((w) => w.length > 0);
      if (words.length === 0) return "";
      let longest = words[0];
      for (const word of words) {
        if (word.length > longest.length) {
          longest = word;
        }
      }
      return longest.toLowerCase().replace(/[^a-z]/g, "");
    });

    cache.set(key, result);
    return result;
  }
}
