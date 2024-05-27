/*
  Warnings:

  - You are about to drop the column `pathId` on the `Shipment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hubstopId,volunteerId]` on the table `Shipment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hubstopId` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_pathId_fkey";

-- DropIndex
DROP INDEX "Shipment_pathId_volunteerId_key";

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "pathId",
ADD COLUMN     "hubstopId" INTEGER NOT NULL,
ALTER COLUMN "destination" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_hubstopId_volunteerId_key" ON "Shipment"("hubstopId", "volunteerId");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_hubstopId_fkey" FOREIGN KEY ("hubstopId") REFERENCES "HubStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
