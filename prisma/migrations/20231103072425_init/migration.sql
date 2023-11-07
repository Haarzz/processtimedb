-- CreateTable
CREATE TABLE `db_login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `userprofile` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proxim` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(255) NOT NULL,
    `modelname` VARCHAR(255) NOT NULL,
    `plan` INTEGER NOT NULL,
    `result` INTEGER NOT NULL,
    `datetime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
