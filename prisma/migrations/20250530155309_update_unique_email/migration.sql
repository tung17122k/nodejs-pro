/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `userName` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_userName_key` ON `users`(`userName`);
