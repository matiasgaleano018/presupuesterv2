import { MigrationInterface, QueryRunner } from "typeorm";

export class Prevandnextamount1757639512282 implements MigrationInterface {
    name = 'Prevandnextamount1757639512282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
