import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChallengeTable1733233614726 implements MigrationInterface {
    name = 'UpdateChallengeTable1733233614726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`mp3_file_path\` \`transcript_path\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_83bb5cfd396855233babf55b6eb\``);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`transcript_path\` \`transcript_path\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_83bb5cfd396855233babf55b6eb\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_83bb5cfd396855233babf55b6eb\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`googleId\` \`googleId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`challengeId\` \`challengeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`transcript_path\` \`transcript_path\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_83bb5cfd396855233babf55b6eb\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`transcript_path\` \`mp3_file_path\` text NULL DEFAULT 'NULL'`);
    }

}
