/*
  Warnings:

  - Added the required column `city` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "city" TEXT NOT NULL;
