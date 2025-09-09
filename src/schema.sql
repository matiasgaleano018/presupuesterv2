CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    status smallint(6) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--insert into users (first_name, last_name, email, password, status, created_at, updated_at) values ('admin', 'test', 'admin@test.com', '123456', 100, utc_timestamp(), utc_timestamp());

CREATE TABLE balance_account_types (
    id int(11) NOT NULL,
    slug varchar(50) NOT NULL,
    label varchar(150) NOT NULL,
    status smallint(6) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO balance_account_types (id, slug, label, status, created_at, updated_at) VALUES 
(10, 'cash', 'Efectivo', 100, utc_timestamp(), utc_timestamp()),
(20, 'savings_account', 'Caja de ahorro', 100, utc_timestamp(), utc_timestamp()),
(30, 'checking_account', 'Cuenta corriente', 100, utc_timestamp(), utc_timestamp()),
(40, 'credit_card', 'Tarjeta de crédito', 100, utc_timestamp(), utc_timestamp()),
(50, 'loan', 'Préstamo', 100, utc_timestamp(), utc_timestamp()),
(60, 'credit_card', 'Tarjeta de débito', 100, utc_timestamp(), utc_timestamp()),
(70, 'other', 'Otro', 100, utc_timestamp(), utc_timestamp());

create table balance_accounts (
    id int(11) NOT NULL AUTO_INCREMENT,
    label varchar(150) NOT NULL,
    type_id int(11) NOT NULL,
    user_id int(11) NOT NULL,
    amount decimal(10,2) NOT NULL,
    number varchar(50) NOT NULL,
    status smallint(6) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (user_id, type_id, number),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (type_id) REFERENCES balance_account_types(id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE operations_types (
    id int(11) NOT NULL,
    slug varchar(50) NOT NULL,
    label varchar(150) NOT NULL,
    status smallint(6) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO operations_types (id, slug, label, status, created_at, updated_at) VALUES 
(10, 'income', 'Ingreso', 100, utc_timestamp(), utc_timestamp()),
(20, 'expense', 'Egreso', 100, utc_timestamp(), utc_timestamp()),
(30, 'transfer', 'Transferencia', 100, utc_timestamp(), utc_timestamp()),
(40, 'ajust', 'Ajuste', 100, utc_timestamp(), utc_timestamp());

create table categories (
    id int(11) NOT NULL AUTO_INCREMENT,
    slug varchar(50) NOT NULL,
    label varchar(150) NOT NULL,
    type_id int(11) NOT NULL,
    user_id int(11) NOT NULL,
    status smallint(6) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (user_id, slug),
    FOREIGN KEY (type_id) REFERENCES operations_types(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE balance_operations (
    id int(11) NOT NULL AUTO_INCREMENT,
    type_id int(11) NOT NULL,
    user_id int(11) NOT NULL,
    category_id int(11) NOT NULL,
    amount decimal(10,2) NOT NULL,
    status smallint(6) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (type_id) REFERENCES operations_types(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE balance_details (
    id int(11) NOT NULL AUTO_INCREMENT,
    operation_id int(11) NOT NULL,
    account_id int(11) NOT NULL,
    amount decimal(10,2) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (operation_id, account_id),
    FOREIGN KEY (account_id) REFERENCES balance_accounts(id),
    FOREIGN KEY (operation_id) REFERENCES balance_operations(id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;