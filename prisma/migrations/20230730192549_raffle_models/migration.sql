-- CreateTable
CREATE TABLE `mal_raffle` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `open` BOOLEAN NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mal_raffle_purchase` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(100) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `raffle_id` BIGINT NOT NULL,
    `transaction` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mal_raffle_purchase` ADD CONSTRAINT `mal_raffle_purchase_raffle_id_fkey` FOREIGN KEY (`raffle_id`) REFERENCES `mal_raffle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
