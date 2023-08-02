/*
  Warnings:

  - A unique constraint covering the columns `[nft_id]` on the table `nfts_apenft` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `mal_raffle_purchase` MODIFY `address` VARCHAR(150) NOT NULL,
    MODIFY `transaction` VARCHAR(150) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `nfts_apenft_nft_id_key` ON `nfts_apenft`(`nft_id`);
