/*
  Warnings:

  - A unique constraint covering the columns `[entityId,name,productTypeId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_name_productTypeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_entityId_name_productTypeId_key" ON "Product"("entityId", "name", "productTypeId");
