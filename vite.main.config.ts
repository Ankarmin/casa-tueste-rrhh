import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      'app-root-path': path.resolve(__dirname, 'src/backend/shims/app-root-path.ts'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@google-cloud/spanner',
        '@sap/hana-client',
        '@sap/hana-client/extension/Stream',
        'better-sqlite3',
        'ioredis',
        'mongodb',
        'mssql',
        'mysql',
        'mysql2',
        'oracledb',
        'pg-native',
        'pg-query-stream',
        'react-native-sqlite-storage',
        'redis',
        'sql.js',
        'sqlite3',
        'ts-node',
        'typeorm-aurora-data-api-driver',
      ],
    },
  },
});
