import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTableCreate1757426064686 implements MigrationInterface {
    name = 'InitTableCreate1757426064686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`balance_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`operation_id\` int NOT NULL, \`account_id\` int NOT NULL, \`amount\` int NOT NULL, \`status\` int NOT NULL DEFAULT '100', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`balance_operations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type_id\` int NOT NULL, \`user_id\` int NOT NULL, \`category_id\` int NOT NULL, \`amount\` int NOT NULL, \`status\` int NOT NULL DEFAULT '100', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operations_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`label\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '100', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`label\` varchar(255) NOT NULL, \`type_id\` int NOT NULL, \`user_id\` int NOT NULL, \`status\` int NOT NULL DEFAULT '100', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8996fbd4c19dfcd028f63ed8bc\` (\`slug\`, \`type_id\`, \`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`balance_account_types\` (\`id\` int NOT NULL, \`slug\` varchar(255) NOT NULL, \`label\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '100', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`balance_accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type_id\` int NOT NULL, \`label\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`amount\` int NOT NULL DEFAULT '0', \`number\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '100', \`description\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b1854c1845a27e95d581a6246e\` (\`user_id\`, \`type_id\`, \`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '100', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`balance_details\` ADD CONSTRAINT \`FK_516e6dbab303d53ec489afd9ce7\` FOREIGN KEY (\`operation_id\`) REFERENCES \`balance_operations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`balance_operations\` ADD CONSTRAINT \`FK_bd19502f0a669bd3485e2cb11a2\` FOREIGN KEY (\`type_id\`) REFERENCES \`operations_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`balance_operations\` ADD CONSTRAINT \`FK_391c752cc76420ce3f7fc831c42\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_cae91bdbdc4c95176c836626335\` FOREIGN KEY (\`type_id\`) REFERENCES \`operations_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` ADD CONSTRAINT \`FK_9c8e3cb731963f8143cf19f014f\` FOREIGN KEY (\`type_id\`) REFERENCES \`balance_account_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` ADD CONSTRAINT \`FK_eec97ddc561a6a01599a2540d80\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` DROP FOREIGN KEY \`FK_eec97ddc561a6a01599a2540d80\``);
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` DROP FOREIGN KEY \`FK_9c8e3cb731963f8143cf19f014f\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_cae91bdbdc4c95176c836626335\``);
        await queryRunner.query(`ALTER TABLE \`balance_operations\` DROP FOREIGN KEY \`FK_391c752cc76420ce3f7fc831c42\``);
        await queryRunner.query(`ALTER TABLE \`balance_operations\` DROP FOREIGN KEY \`FK_bd19502f0a669bd3485e2cb11a2\``);
        await queryRunner.query(`ALTER TABLE \`balance_details\` DROP FOREIGN KEY \`FK_516e6dbab303d53ec489afd9ce7\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1854c1845a27e95d581a6246e\` ON \`balance_accounts\``);
        await queryRunner.query(`DROP TABLE \`balance_accounts\``);
        await queryRunner.query(`DROP TABLE \`balance_account_types\``);
        await queryRunner.query(`DROP INDEX \`IDX_8996fbd4c19dfcd028f63ed8bc\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`operations_types\``);
        await queryRunner.query(`DROP TABLE \`balance_operations\``);
        await queryRunner.query(`DROP TABLE \`balance_details\``);
    }

}
