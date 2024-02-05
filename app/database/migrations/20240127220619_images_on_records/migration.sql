-- AlterEnum
ALTER TYPE "FormArea" ADD VALUE 'ServiceRecord';

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "assessment" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "objective" TEXT,
ADD COLUMN     "plan" TEXT,
ADD COLUMN     "subjective" TEXT,
ALTER COLUMN "datetime" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "datetime" SET DATA TYPE TIMESTAMPTZ;

-- CreateTable
CREATE TABLE "ImagesOnRecords" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileName" TEXT NOT NULL,
    "storedFileName" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "signedUrl" TEXT NOT NULL,
    "recordId" UUID NOT NULL,

    CONSTRAINT "ImagesOnRecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ImagesOnRecords_recordId_idx" ON "ImagesOnRecords"("recordId");

-- AddForeignKey
ALTER TABLE "ImagesOnRecords" ADD CONSTRAINT "ImagesOnRecords_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
