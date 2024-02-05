/*
  Warnings:

  - A unique constraint covering the columns `[productId,serviceId]` on the table `ProductsOnServices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductsOnServices_productId_serviceId_key" ON "ProductsOnServices"("productId", "serviceId");
