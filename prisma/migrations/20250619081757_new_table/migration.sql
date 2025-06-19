-- CreateTable
CREATE TABLE `BookingInfo` (
    `bookingID` INTEGER NOT NULL AUTO_INCREMENT,
    `RoomName` VARCHAR(255) NULL,
    `sendDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sender` VARCHAR(255) NULL,
    `phoneIn` VARCHAR(255) NULL,
    `phoneOut` VARCHAR(255) NULL,
    `officeLocation` VARCHAR(255) NULL,
    `purpose` VARCHAR(255) NULL,
    `startDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `capacity` INTEGER NULL,
    `cfSender` VARCHAR(255) NULL,
    `cfPhone` VARCHAR(255) NULL,
    `SendStatus` VARCHAR(255) NULL,
    `Role` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `RecordStatus` VARCHAR(1) NULL,

    PRIMARY KEY (`bookingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(255) NULL,
    `officeLocation` VARCHAR(255) NULL,
    `createDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastEdit` DATETIME(3) NULL,
    `RecordStatus` VARCHAR(1) NULL,

    UNIQUE INDEX `users_userEmail_key`(`userEmail`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assessment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meetingRoom` VARCHAR(255) NULL,
    `gender` VARCHAR(255) NULL,
    `role` VARCHAR(255) NULL,
    `responses` JSON NOT NULL,
    `comment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
