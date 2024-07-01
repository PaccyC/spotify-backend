/*
  Warnings:

  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Artist` DROP FOREIGN KEY `Artist_songId_fkey`;

-- DropTable
DROP TABLE `Artist`;

-- CreateTable
CREATE TABLE `artists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `songId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `artists` ADD CONSTRAINT `artists_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `songs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
