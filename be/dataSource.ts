import { cwd, env } from 'process';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  entities: [cwd() + '/src/entities/**/*.model.ts'],
  migrations: [cwd() + '/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default dataSource;
