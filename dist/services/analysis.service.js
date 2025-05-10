"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAnalyses = exports.deleteAnalysis = exports.updateAnalysis = exports.getAnalysis = exports.createAnalysis = void 0;
const client_1 = require("@prisma/client");
const text_analyzer_1 = require("./text-analyzer");
const prisma = new client_1.PrismaClient();
const createAnalysis = (userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.textAnalysis.create({
        data: {
            user: {
                connect: { id: userId },
            },
            content,
            words: text_analyzer_1.TextAnalyzer.countWords(content),
            characters: text_analyzer_1.TextAnalyzer.countCharacters(content),
            sentences: text_analyzer_1.TextAnalyzer.countSentences(content),
            paragraphs: text_analyzer_1.TextAnalyzer.countParagraphs(content),
            longestWords: text_analyzer_1.TextAnalyzer.findLongestWords(content).join(', '),
        },
    });
});
exports.createAnalysis = createAnalysis;
const getAnalysis = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.textAnalysis.findFirst({
        where: {
            AND: [{ id }, { userId }],
        },
    });
});
exports.getAnalysis = getAnalysis;
const updateAnalysis = (userId, id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.textAnalysis.updateMany({
        where: {
            id,
            userId,
        },
        data: {
            content,
            words: text_analyzer_1.TextAnalyzer.countWords(content),
            characters: text_analyzer_1.TextAnalyzer.countCharacters(content),
            sentences: text_analyzer_1.TextAnalyzer.countSentences(content),
            paragraphs: text_analyzer_1.TextAnalyzer.countParagraphs(content),
            longestWords: text_analyzer_1.TextAnalyzer.findLongestWords(content).join(', '),
        },
    });
});
exports.updateAnalysis = updateAnalysis;
const deleteAnalysis = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.textAnalysis.deleteMany({
        where: {
            AND: [{ id }, { userId }],
        },
    });
});
exports.deleteAnalysis = deleteAnalysis;
const getAllAnalyses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.textAnalysis.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
});
exports.getAllAnalyses = getAllAnalyses;
