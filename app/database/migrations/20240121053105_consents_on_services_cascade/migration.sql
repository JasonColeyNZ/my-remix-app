-- DropForeignKey
ALTER TABLE "ConsentsOnServices" DROP CONSTRAINT "ConsentsOnServices_formId_fkey";

-- AddForeignKey
ALTER TABLE "ConsentsOnServices" ADD CONSTRAINT "ConsentsOnServices_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
