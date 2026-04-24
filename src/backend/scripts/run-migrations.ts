import { initializeDatabase } from '../db/data-source';

async function main() {
  const dataSource = await initializeDatabase();
  await dataSource.runMigrations();
  await dataSource.destroy();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
