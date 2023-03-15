/*
  Warnings:

  - The primary key for the `welcomes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guildId` on the `welcomes` table. All the data in the column will be lost.
  - Added the required column `guildID` to the `welcomes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "welcomes" DROP CONSTRAINT "welcomes_pkey",
DROP COLUMN "guildId",
ADD COLUMN     "guildID" TEXT NOT NULL,
ADD CONSTRAINT "welcomes_pkey" PRIMARY KEY ("guildID");
