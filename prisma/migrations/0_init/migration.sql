-- CreateTable
CREATE TABLE `auth_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_group_permissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`(`permission_id`),
    UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq`(`group_id`, `permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `content_type_id` INTEGER NOT NULL,
    `codename` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq`(`content_type_id`, `codename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(128) NOT NULL,
    `last_login` DATETIME(6) NULL,
    `is_superuser` BOOLEAN NOT NULL,
    `username` VARCHAR(150) NOT NULL,
    `first_name` VARCHAR(150) NOT NULL,
    `last_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `is_staff` BOOLEAN NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `date_joined` DATETIME(6) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_user_groups` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    INDEX `auth_user_groups_group_id_97559544_fk_auth_group_id`(`group_id`),
    UNIQUE INDEX `auth_user_groups_user_id_group_id_94350c0c_uniq`(`user_id`, `group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_user_user_permissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm`(`permission_id`),
    UNIQUE INDEX `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq`(`user_id`, `permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_admin_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_time` DATETIME(6) NOT NULL,
    `object_id` LONGTEXT NULL,
    `object_repr` VARCHAR(200) NOT NULL,
    `action_flag` SMALLINT UNSIGNED NOT NULL,
    `change_message` LONGTEXT NOT NULL,
    `content_type_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co`(`content_type_id`),
    INDEX `django_admin_log_user_id_c564eba6_fk_auth_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_content_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_label` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq`(`app_label`, `model`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_migrations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `app` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `applied` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_session` (
    `session_key` VARCHAR(40) NOT NULL,
    `session_data` LONGTEXT NOT NULL,
    `expire_date` DATETIME(6) NOT NULL,

    INDEX `django_session_expire_date_a5c62663`(`expire_date`),
    PRIMARY KEY (`session_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_claim` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` LONGTEXT NOT NULL,
    `text` LONGTEXT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_claimer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `wallet` VARCHAR(300) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `city` VARCHAR(200) NOT NULL,
    `postal` VARCHAR(100) NOT NULL,
    `address` VARCHAR(500) NOT NULL,
    `flat` VARCHAR(20) NULL,
    `firstname` VARCHAR(300) NOT NULL,
    `lastname` VARCHAR(300) NOT NULL,
    `size` VARCHAR(20) NOT NULL,
    `agree` BOOLEAN NOT NULL,
    `gets_merch` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_claimoption` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `claim_id` BIGINT NOT NULL,

    INDEX `members_claimoption_claim_id_9e8526ea_fk_members_claim_id`(`claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_genzwinners` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(150) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_leaderboard` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_leaderboardevent` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `round` INTEGER NOT NULL,
    `draw` INTEGER NOT NULL,
    `ticketnum` INTEGER NOT NULL,
    `item` VARCHAR(100) NOT NULL,
    `date` DATETIME(6) NOT NULL,
    `address_id` BIGINT NOT NULL,

    INDEX `members_leaderboarde_address_id_0417990d_fk_members_l`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_leaderboardeventround` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `currentround` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_leaderboardschedule` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `round` INTEGER NOT NULL,
    `subround` INTEGER NOT NULL,
    `item` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_leaderboardtickets` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `ticketnum` INTEGER NOT NULL,
    `address_id` BIGINT NOT NULL,

    INDEX `members_leaderboardt_address_id_ea36fe80_fk_members_l`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_leaderboarduser` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(150) NOT NULL,
    `points` INTEGER NOT NULL,
    `spins` INTEGER NOT NULL,
    `made_spins` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_nftwinners` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(150) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_raffle` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `text` LONGTEXT NOT NULL,
    `active` BOOLEAN NOT NULL,
    `not_active_text` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_rafflemember` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `pass_name` INTEGER NULL,
    `wallet` VARCHAR(100) NOT NULL,
    `whitelisted` BOOLEAN NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_wheelroyale` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(1000) NOT NULL,
    `not_active_text` LONGTEXT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members_withdrawal` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(100) NOT NULL,
    `amount` DECIMAL(35, 8) NOT NULL,
    `date` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_apenft` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nft_id` INTEGER NOT NULL,
    `owner` VARCHAR(150) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_breedingnft` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nft_id` INTEGER NOT NULL,
    `owner` VARCHAR(150) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_colanft` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nft_id` INTEGER NOT NULL,
    `nft_type` VARCHAR(200) NOT NULL,
    `price` INTEGER NOT NULL,
    `max_supply` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_contract` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `provider` VARCHAR(500) NOT NULL,
    `address` VARCHAR(500) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `abi` LONGTEXT NOT NULL,
    `mainnet` BOOLEAN NOT NULL,
    `opensea_url` VARCHAR(300) NULL,
    `text` LONGTEXT NULL,
    `standard` VARCHAR(100) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_error` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(100) NULL,
    `location` VARCHAR(200) NULL,
    `error` LONGTEXT NULL,
    `date` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_lootboosts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nft_type` VARCHAR(200) NOT NULL,
    `boost` DECIMAL(10, 1) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_lootnft` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nft_id` INTEGER NOT NULL,
    `nft_type` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_metamaskerror` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(100) NULL,
    `code` VARCHAR(10) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `date` DATETIME(6) NOT NULL,
    `params` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_petnft` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nft_id` INTEGER NOT NULL,
    `nft_type` VARCHAR(200) NOT NULL,
    `daily_reward` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `max_supply` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_saleaction` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(200) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `whitelistSale` BOOLEAN NOT NULL,
    `error` LONGTEXT NULL,
    `gas` VARCHAR(80) NULL,
    `gasPrice` VARCHAR(80) NULL,
    `maxFeePerGas` VARCHAR(80) NULL,
    `counter` INTEGER NOT NULL,
    `date` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_transaction` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(500) NOT NULL,
    `from_address` VARCHAR(100) NOT NULL,
    `value` INTEGER NOT NULL,
    `input_data` VARCHAR(1000) NOT NULL,
    `contract_id` BIGINT NOT NULL,

    INDEX `nfts_transaction_contract_id_1254897e_fk_nfts_contract_id`(`contract_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nfts_treasurynft` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nft_id` INTEGER NOT NULL,
    `owner` VARCHAR(150) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages_banner` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `text` LONGTEXT NOT NULL,
    `button_text` VARCHAR(100) NULL,
    `button_link` VARCHAR(300) NOT NULL,
    `open_in_tab` BOOLEAN NOT NULL,
    `image` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages_command` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cmd` VARCHAR(200) NOT NULL,
    `from_id` INTEGER NOT NULL,
    `to_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages_faq` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(500) NOT NULL,
    `answer` LONGTEXT NOT NULL,
    `priority` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages_telegramchatid` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `chat_id` VARCHAR(100) NOT NULL,
    `get_errors` BOOLEAN NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_group_permissions` ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_group_permissions` ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_permission` ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_groups` ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_groups` ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_user_permissions` ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_user_permissions` ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `members_claimoption` ADD CONSTRAINT `members_claimoption_claim_id_9e8526ea_fk_members_claim_id` FOREIGN KEY (`claim_id`) REFERENCES `members_claim`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `members_leaderboardevent` ADD CONSTRAINT `members_leaderboarde_address_id_0417990d_fk_members_l` FOREIGN KEY (`address_id`) REFERENCES `members_leaderboarduser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `members_leaderboardtickets` ADD CONSTRAINT `members_leaderboardt_address_id_ea36fe80_fk_members_l` FOREIGN KEY (`address_id`) REFERENCES `members_leaderboarduser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nfts_transaction` ADD CONSTRAINT `nfts_transaction_contract_id_1254897e_fk_nfts_contract_id` FOREIGN KEY (`contract_id`) REFERENCES `nfts_contract`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

