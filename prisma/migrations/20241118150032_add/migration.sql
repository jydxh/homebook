/*
  Warnings:

  - You are about to drop the column `image` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `PropertyImages` (
    `id` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `image_public_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PropertyImages` ADD CONSTRAINT `PropertyImages_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
