/*
  Warnings:

  - Added the required column `destination` to the `Path` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Path" ADD COLUMN     "destination" TEXT NOT NULL;
