-- CreateTable
CREATE TABLE "TastingRecord" (
    "id" SERIAL NOT NULL,
    "coffeeName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TastingRecord_pkey" PRIMARY KEY ("id")
);
