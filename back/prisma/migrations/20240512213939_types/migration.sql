/*
  Warnings:

  - You are about to drop the column `destination` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the `HubSmall` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Aid_Type" ADD VALUE 'MEDICINE';
ALTER TYPE "Aid_Type" ADD VALUE 'MATERIALS';
ALTER TYPE "Aid_Type" ADD VALUE 'GADGETS';
ALTER TYPE "Aid_Type" ADD VALUE 'OTHER';

-- DropForeignKey
ALTER TABLE "HubSmall" DROP CONSTRAINT "Hub_adminId_fkey";

-- DropForeignKey
ALTER TABLE "HubStop" DROP CONSTRAINT "HubStop_hubId_fkey";

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "destination";

-- DropTable
DROP TABLE "HubSmall";

-- CreateTable
CREATE TABLE "Hub" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "startHour" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Empty',
    "photoUrl" TEXT,
    "address" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "Hub_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hub_phone_key" ON "Hub"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Hub_city_region_address_key" ON "Hub"("city", "region", "address");

-- AddForeignKey
ALTER TABLE "Hub" ADD CONSTRAINT "Hub_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubStop" ADD CONSTRAINT "HubStop_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "Hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
