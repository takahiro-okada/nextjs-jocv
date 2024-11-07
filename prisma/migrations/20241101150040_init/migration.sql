/*
  Warnings:

  - You are about to drop the `Cohort` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prefecture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prefecture" DROP CONSTRAINT "Prefecture_countryId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cohortId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_currentCountryId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_currentPrefectureId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_deploymentCountryId_fkey";

-- DropTable
DROP TABLE "Cohort";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Prefecture";
