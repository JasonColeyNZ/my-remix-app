/*
  Warnings:

  - A unique constraint covering the columns `[entityId,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_entityId_name_key" ON "Category"("entityId", "name");
