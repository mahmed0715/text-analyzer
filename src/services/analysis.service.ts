import { PrismaClient } from "@prisma/client";
import { TextAnalyzer } from "./text-analyzer";

const prisma = new PrismaClient();

export const createAnalysis = async (content: string) => {
  return prisma.textAnalysis.create({
    data: {
      content,
      words: TextAnalyzer.countWords(content),
      characters: TextAnalyzer.countCharacters(content),
      sentences: TextAnalyzer.countSentences(content),
      paragraphs: TextAnalyzer.countParagraphs(content),
      longestWords: TextAnalyzer.findLongestWords(content).join(", "),
    },
  });
};

export const getAnalysis = async (id: string) => {
  return prisma.textAnalysis.findUnique({ where: { id } });
};

export const updateAnalysis = async (id: string, content: string) => {
  return prisma.textAnalysis.update({
    where: { id },
    data: {
      content,
      words: TextAnalyzer.countWords(content),
      characters: TextAnalyzer.countCharacters(content),
      sentences: TextAnalyzer.countSentences(content),
      paragraphs: TextAnalyzer.countParagraphs(content),
      longestWords: TextAnalyzer.findLongestWords(content).join(", "),
    },
  });
};

export const deleteAnalysis = async (id: string) => {
  return prisma.textAnalysis.delete({ where: { id } });
};

export const getAllAnalyses = async () => {
  return prisma.textAnalysis.findMany();
};
