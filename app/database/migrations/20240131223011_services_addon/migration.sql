-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "addonDuration" TEXT,
ADD COLUMN     "addonPrice" DECIMAL(65,30),
ADD COLUMN     "addonTimeMargin" TEXT,
ADD COLUMN     "isAddon" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ServiceAddon" (
    "serviceId" UUID NOT NULL,
    "addonServiceId" UUID NOT NULL,

    CONSTRAINT "ServiceAddon_pkey" PRIMARY KEY ("serviceId","addonServiceId")
);

-- AddForeignKey
ALTER TABLE "ServiceAddon" ADD CONSTRAINT "ServiceAddon_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAddon" ADD CONSTRAINT "ServiceAddon_addonServiceId_fkey" FOREIGN KEY ("addonServiceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
