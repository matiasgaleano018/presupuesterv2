// typeorm.config.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config(); // carga las variables de .env

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  entities: [join(__dirname, '/src/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/src/database/migrations/*{.ts,.js}')],
  synchronize: false,
});
