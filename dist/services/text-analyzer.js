"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAnalyzer = void 0;
const cache_1 = __importDefault(require("../utils/cache"));
class TextAnalyzer {
    static countWords(text) {
        const key = `words-${text}`;
        const cached = cache_1.default.get(key);
        if (cached !== undefined)
            return cached;
        const result = text.split(/\s+/).filter((word) => word.length > 0).length;
        cache_1.default.set(key, result);
        return result;
    }
    static countCharacters(text) {
        const key = `characters-${text}`;
        const cached = cache_1.default.get(key);
        if (cached !== undefined)
            return cached;
        const result = text.replace(/\s+/g, "").length;
        cache_1.default.set(key, result);
        return result;
    }
    static countSentences(text) {
        const key = `sentenses-${text}`;
        const cached = cache_1.default.get(key);
        if (cached !== undefined)
            return cached;
        const result = text
            .split(/[.!?]+/)
            .filter((s) => s.trim().length > 0).length;
        cache_1.default.set(key, result);
        return result;
    }
    static countParagraphs(text) {
        const key = `sentenses-${text}`;
        const cached = cache_1.default.get(key);
        if (cached !== undefined)
            return cached;
        const result = text
            .split(/\n\s*\n/)
            .filter((p) => p.trim().length > 0).length;
        cache_1.default.set(key, result);
        return result;
    }
    static findLongestWords(text) {
        const key = `longestWords-${text}`;
        const cached = cache_1.default.get(key);
        if (cached !== undefined)
            return cached;
        const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
        const result = paragraphs.map((p) => {
            const words = p.split(/\s+/).filter((w) => w.length > 0);
            if (words.length === 0)
                return "";
            let longest = words[0];
            for (const word of words) {
                if (word.length > longest.length) {
                    longest = word;
                }
            }
            return longest.toLowerCase().replace(/[^a-z]/g, "");
        });
        cache_1.default.set(key, result);
        return result;
    }
}
exports.TextAnalyzer = TextAnalyzer;
