/*
  Warnings:

  - The primary key for the `ServicesOnRecords` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "TrackingType" AS ENUM ('CONSUMABLE', 'UNIT');

-- AlterTable
ALTER TABLE "ServicesOnRecords" DROP CONSTRAINT "ServicesOnRecords_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "notes" TEXT,
ADD CONSTRAINT "ServicesOnRecords_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ProductsOnRecords" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "serviceOnRecordId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "cost" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "stocktake" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductsOnRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnServices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "serviceId" UUID NOT NULL,
    "trackingType" "TrackingType" NOT NULL DEFAULT 'UNIT',

    CONSTRAINT "ProductsOnServices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductsOnRecords" ADD CONSTRAINT "ProductsOnRecords_serviceOnRecordId_fkey" FOREIGN KEY ("serviceOnRecordId") REFERENCES "ServicesOnRecords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnRecords" ADD CONSTRAINT "ProductsOnRecords_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnServices" ADD CONSTRAINT "ProductsOnServices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnServices" ADD CONSTRAINT "ProductsOnServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
