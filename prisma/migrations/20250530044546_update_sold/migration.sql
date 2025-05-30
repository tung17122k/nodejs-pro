/*
  Warnings:

  - Made the column `name` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `detailDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sold` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `factory` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `target` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `detailDesc` VARCHAR(255) NOT NULL,
    MODIFY `sold` INTEGER NOT NULL DEFAULT 0,
    MODIFY `factory` VARCHAR(255) NOT NULL,
    MODIFY `target` VARCHAR(255) NOT NULL;
