/*
  Warnings:

  - Added the required column `OTP` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `OTP` INTEGER NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';
