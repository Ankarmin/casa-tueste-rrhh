import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

function parseBoolean(value: string | undefined) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (['1', 'true', 'yes', 'on'].includes(normalizedValue)) {
    return true;
  }

  if (['0', 'false', 'no', 'off'].includes(normalizedValue)) {
    return false;
  }

  return undefined;
}

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
  DATABASE_PUBLIC_URL: z.string().trim().min(1).optional(),
  DATABASE_URL: z.string().trim().min(1).optional(),
  PGHOST: z.string().trim().min(1).optional(),
  PGPORT: z.coerce.number().int().min(1).max(65535).optional(),
  PGDATABASE: z.string().trim().min(1).optional(),
  PGUSER: z.string().trim().min(1).optional(),
  PGPASSWORD: z.string().min(1).optional(),
  DB_HOST: z.string().trim().min(1).optional(),
  DB_PORT: z.coerce.number().int().min(1).max(65535).optional(),
  DB_NAME: z.string().trim().min(1).optional(),
  DB_USER: z.string().trim().min(1).optional(),
  DB_PASSWORD: z.string().min(1).optional(),
  DB_SSL: z.string().trim().optional(),
});

const parsedEnv = envSchema.parse(process.env);
const connectionString = parsedEnv.DATABASE_PUBLIC_URL ?? parsedEnv.DATABASE_URL;
const hasDiscreteConnectionConfig = Boolean(parsedEnv.PGHOST ?? parsedEnv.DB_HOST);

if (!connectionString && !hasDiscreteConnectionConfig) {
  throw new Error(
    'Falta la configuracion de base de datos. Define DATABASE_PUBLIC_URL o las variables PG*/DB* antes de iniciar la aplicacion.',
  );
}

export const env = {
  url: connectionString,
  host: parsedEnv.PGHOST ?? parsedEnv.DB_HOST ?? '127.0.0.1',
  port: parsedEnv.PGPORT ?? parsedEnv.DB_PORT ?? 5432,
  database: parsedEnv.PGDATABASE ?? parsedEnv.DB_NAME ?? 'rrhh_casa_tueste',
  username: parsedEnv.PGUSER ?? parsedEnv.DB_USER ?? 'rrhh',
  password: parsedEnv.PGPASSWORD ?? parsedEnv.DB_PASSWORD ?? 'rrhh_local_dev',
  ssl: parseBoolean(parsedEnv.DB_SSL) ?? Boolean(parsedEnv.DATABASE_PUBLIC_URL),
};
