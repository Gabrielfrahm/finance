import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dontenv from 'dotenv';

dontenv.config({ path: '../.env' });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [join(__dirname, '4-framework/typeorm/migrations/*.{ts,js}')],
  synchronize: false,
});

export default AppDataSource;
