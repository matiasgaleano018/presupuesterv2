-- -------------------------------------------
-- CORRER EN LA BASE DE DATOS LUEGO DE INICIAR LA APLICACIÓN POR PRIMERA VEZ
-- -------------------------------------------

INSERT INTO balance_account_types (id, slug, label, status, created_at, updated_at) VALUES 
(10, 'cash', 'Efectivo', 100, utc_timestamp(), utc_timestamp()),
(20, 'savings_account', 'Caja de ahorro', 100, utc_timestamp(), utc_timestamp()),
(30, 'checking_account', 'Cuenta corriente', 100, utc_timestamp(), utc_timestamp()),
(40, 'credit_card', 'Tarjeta de crédito', 100, utc_timestamp(), utc_timestamp()),
(50, 'loan', 'Préstamo', 100, utc_timestamp(), utc_timestamp()),
(60, 'debit_card', 'Tarjeta de débito', 100, utc_timestamp(), utc_timestamp()),
(70, 'other', 'Otro', 100, utc_timestamp(), utc_timestamp());

INSERT INTO operations_types (id, slug, label, status, created_at, updated_at) VALUES 
(10, 'income', 'Ingreso', 100, utc_timestamp(), utc_timestamp()),
(20, 'expense', 'Egreso', 100, utc_timestamp(), utc_timestamp()),
(30, 'transfer', 'Transferencia', 100, utc_timestamp(), utc_timestamp()),
(40, 'ajust', 'Ajuste', 100, utc_timestamp(), utc_timestamp());
