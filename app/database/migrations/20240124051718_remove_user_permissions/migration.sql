/*
  Warnings:

  - You are about to drop the column `userPermissionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPermissionId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userPermissionId";

-- DropTable
DROP TABLE "UserPermissions";
