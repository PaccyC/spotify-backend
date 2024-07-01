/*
  Warnings:

  - You are about to drop the column `artistId` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the `artists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artists` DROP FOREIGN KEY `artists_songId_fkey`;

-- AlterTable
ALTER TABLE `songs` DROP COLUMN `artistId`;

-- DropTable
DROP TABLE `artists`;

-- CreateTable
CREATE TABLE `Artist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `songId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `songs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
