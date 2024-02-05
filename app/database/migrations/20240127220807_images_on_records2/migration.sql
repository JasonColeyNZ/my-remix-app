/*
  Warnings:

  - You are about to drop the column `bloodPressure` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "bloodPressure",
DROP COLUMN "description";
