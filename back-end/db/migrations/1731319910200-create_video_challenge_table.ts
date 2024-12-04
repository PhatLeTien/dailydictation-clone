import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVideoChallengeTable1731319910200 implements MigrationInterface {
    name = 'CreateVideoChallengeTable1731319910200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_368e146b785b574f42ae9e53d5e\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`thumbnail\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`videoId\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`videoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`mp3_file_path\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`mp3_file_path\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD CONSTRAINT \`FK_d9e20fe40b466e63bb08970ec74\` FOREIGN KEY (\`videoId\`) REFERENCES \`videos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_83bb5cfd396855233babf55b6eb\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_83bb5cfd396855233babf55b6eb\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP FOREIGN KEY \`FK_d9e20fe40b466e63bb08970ec74\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`mp3_file_path\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`mp3_file_path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`transcripts\` DROP COLUMN \`videoId\``);
        await queryRunner.query(`ALTER TABLE \`transcripts\` ADD \`videoId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`thumbnail\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`FK_368e146b785b574f42ae9e53d5e\` ON \`users\` (\`roleId\`)`);
    }

}
