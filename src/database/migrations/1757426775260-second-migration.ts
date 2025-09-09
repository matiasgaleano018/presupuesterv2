import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1757426775260 implements MigrationInterface {
    name = 'SecondMigration1757426775260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`
          INSERT INTO balance_account_types (id, slug, label, status, created_at, updated_at) VALUES
          (10, 'cash', 'Efectivo', 100, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
          (20, 'savings_account', 'Caja de ahorro', 100, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
          (30, 'checking_account', 'Cuenta corriente', 100, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
          (40, 'credit_card', 'Tarjeta de crédito', 100, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
          (50, 'loan', 'Préstamo', 100, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
          (60, 'debit_card', 'Tarjeta de débito', 100, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
          (70, 'other', 'Otro', 100, UTC_TIMESTAMP(), UTC_TIMESTAMP())
        `);
        await queryRunner.query(`
        INSERT INTO operations_types (id, slug, label, status, created_at, updated_at) VALUES 
        (10, 'income', 'Ingreso', 100, utc_timestamp(), utc_timestamp()),
        (20, 'expense', 'Egreso', 100, utc_timestamp(), utc_timestamp()),
        (30, 'transfer', 'Transferencia', 100, utc_timestamp(), utc_timestamp()),
        (40, 'ajust', 'Ajuste', 100, utc_timestamp(), utc_timestamp())
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`balance_accounts\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DELETE FROM balance_account_types WHERE id IN (10,20,30,40,50,60,70)`);
        await queryRunner.query(`DELETE FROM operations_types WHERE id IN (10,20,30,40)`);
    }

}
