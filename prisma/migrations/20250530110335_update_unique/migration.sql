/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `roles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `roles` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `roles_name_key` ON `roles`(`name`);
