/*
  Warnings:

  - A unique constraint covering the columns `[countryCode]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryCode` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "countryCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Country_countryCode_key" ON "Country"("countryCode");
