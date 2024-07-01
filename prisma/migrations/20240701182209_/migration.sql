-- DropForeignKey
ALTER TABLE `playlists` DROP FOREIGN KEY `playlists_songId_fkey`;

-- AlterTable
ALTER TABLE `playlists` MODIFY `songId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `playlists` ADD CONSTRAINT `playlists_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `songs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
