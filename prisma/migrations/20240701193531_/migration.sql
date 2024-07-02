/*
  Warnings:

  - You are about to drop the column `songId` on the `playlists` table. All the data in the column will be lost.
  - Made the column `description` on table `playlists` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `playlists` DROP FOREIGN KEY `playlists_songId_fkey`;

-- AlterTable
ALTER TABLE `playlists` DROP COLUMN `songId`,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_PlaylistSongs` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlaylistSongs_AB_unique`(`A`, `B`),
    INDEX `_PlaylistSongs_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PlaylistSongs` ADD CONSTRAINT `_PlaylistSongs_A_fkey` FOREIGN KEY (`A`) REFERENCES `playlists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistSongs` ADD CONSTRAINT `_PlaylistSongs_B_fkey` FOREIGN KEY (`B`) REFERENCES `songs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
