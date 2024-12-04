import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabase1731559265179 implements MigrationInterface {
    name = 'UpdateDatabase1731559265179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP FOREIGN KEY \`FK_d9e20fe40b466e63bb08970ec74\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`filePath\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` CHANGE \`videoId\` \`videoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_83bb5cfd396855233babf55b6eb\``);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`mp3_file_path\` \`mp3_file_path\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD CONSTRAINT \`FK_d9e20fe40b466e63bb08970ec74\` FOREIGN KEY (\`videoId\`) REFERENCES \`videos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_83bb5cfd396855233babf55b6eb\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_83bb5cfd396855233babf55b6eb\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP FOREIGN KEY \`FK_d9e20fe40b466e63bb08970ec74\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`mp3_file_path\` \`mp3_file_path\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_83bb5cfd396855233babf55b6eb\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` CHANGE \`videoId\` \`videoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`filePath\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`endTime\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`startTime\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`text\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD CONSTRAINT \`FK_d9e20fe40b466e63bb08970ec74\` FOREIGN KEY (\`videoId\`) REFERENCES \`videos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
