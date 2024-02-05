/*
  Warnings:

  - A unique constraint covering the columns `[entityId,name,categoryId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Service_name_categoryId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Service_entityId_name_categoryId_key" ON "Service"("entityId", "name", "categoryId");
