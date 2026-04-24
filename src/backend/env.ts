import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

const candidateEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(path.dirname(process.execPath), '.env'),
  typeof process.resourcesPath === 'string' ? path.resolve(process.resourcesPath, '.env') : null,
].filter((envPath, index, allPaths): envPath is string => Boolean(envPath) && allPaths.indexOf(envPath) === index);

for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const envSchema = z.object({
  DB_HOST: z.string().trim().min(1).default('127.0.0.1'),
  DB_PORT: z.coerce.number().int().min(1).max(65535).default(5432),
  DB_NAME: z.string().trim().min(1).default('rrhh_casa_tueste'),
  DB_USER: z.string().trim().min(1).default('rrhh'),
  DB_PASSWORD: z.string().min(1).default('rrhh_local_dev'),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  host: parsedEnv.DB_HOST,
  port: parsedEnv.DB_PORT,
  database: parsedEnv.DB_NAME,
  username: parsedEnv.DB_USER,
  password: parsedEnv.DB_PASSWORD,
};
