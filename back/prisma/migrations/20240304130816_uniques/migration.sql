/*
  Warnings:

  - A unique constraint covering the columns `[shipmentId,name,type]` on the table `Good` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pathId,name,type]` on the table `Need` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driverId,stops,startTime]` on the table `Path` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pathId,volunteerId]` on the table `Shipment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pathId` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "pathId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Good_shipmentId_name_type_key" ON "Good"("shipmentId", "name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Need_pathId_name_type_key" ON "Need"("pathId", "name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Path_driverId_stops_startTime_key" ON "Path"("driverId", "stops", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_pathId_volunteerId_key" ON "Shipment"("pathId", "volunteerId");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "Path"("id") ON DELETE CASCADE ON UPDATE CASCADE;
