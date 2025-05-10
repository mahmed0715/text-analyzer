import { PrismaClient } from '@prisma/client';
import { TextAnalyzer } from './text-analyzer';

const prisma = new PrismaClient();

export const createAnalysis = async (userId: string, content: string) => {
  return prisma.textAnalysis.create({
    data: {
      user: {
        connect: { id: userId },
      },
      content,
      words: TextAnalyzer.countWords(content),
      characters: TextAnalyzer.countCharacters(content),
      sentences: TextAnalyzer.countSentences(content),
      paragraphs: TextAnalyzer.countParagraphs(content),
      longestWords: TextAnalyzer.findLongestWords(content).join(', '),
    },
  });
};

export const getAnalysis = async (userId: string, id: string) => {
  return prisma.textAnalysis.findFirst({
    where: {
      AND: [{ id }, { userId }],
    },
  });
};

export const updateAnalysis = async (userId: string, id: string, content: string) => {
  return prisma.textAnalysis.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      content,
      words: TextAnalyzer.countWords(content),
      characters: TextAnalyzer.countCharacters(content),
      sentences: TextAnalyzer.countSentences(content),
      paragraphs: TextAnalyzer.countParagraphs(content),
      longestWords: TextAnalyzer.findLongestWords(content).join(', '),
    },
  });
};

export const deleteAnalysis = async (userId: string, id: string) => {
  return prisma.textAnalysis.deleteMany({
    where: {
      AND: [{ id }, { userId }],
    },
  });
};

export const getAllAnalyses = async (userId: string) => {
  return prisma.textAnalysis.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
