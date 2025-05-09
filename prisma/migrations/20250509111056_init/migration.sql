-- CreateTable
CREATE TABLE "TextAnalysis" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "words" INTEGER NOT NULL,
    "characters" INTEGER NOT NULL,
    "sentences" INTEGER NOT NULL,
    "paragraphs" INTEGER NOT NULL,
    "longestWords" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextAnalysis_pkey" PRIMARY KEY ("id")
);
