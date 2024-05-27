/*
  Warnings:

  - Made the column `status` on table `HubSmall` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HubSmall" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Empty';
