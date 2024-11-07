/*
  Warnings:

  - You are about to drop the column `cohortId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "cohortId",
ADD COLUMN     "cohortGroup" TEXT,
ADD COLUMN     "cohortYear" INTEGER;
