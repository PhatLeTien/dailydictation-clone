import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabase1731557443598 implements MigrationInterface {
    name = 'UpdateDatabase1731557443598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subtitle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`videoId\` int NOT NULL, \`startTime\` float NOT NULL, \`endTime\` float NOT NULL, \`text\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_83bb5cfd396855233babf55b6eb\``);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`mp3_file_path\` \`mp3_file_path\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`subtitle\` ADD CONSTRAINT \`FK_ac53120c00173037dda71873978\` FOREIGN KEY (\`videoId\`) REFERENCES \`videos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_83bb5cfd396855233babf55b6eb\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_83bb5cfd396855233babf55b6eb\``);
        await queryRunner.query(`ALTER TABLE \`subtitle\` DROP FOREIGN KEY \`FK_ac53120c00173037dda71873978\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`mp3_file_path\` \`mp3_file_path\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_83bb5cfd396855233babf55b6eb\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`subtitle\``);
    }

}
