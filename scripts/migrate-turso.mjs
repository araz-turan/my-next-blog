import {createClient} from '@libsql/client';
import {readdirSync, readFileSync, existsSync} from 'node:fs';
import path from 'node:path';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const dir = path.join(process.cwd(), 'prisma', 'migrations');
const folders = readdirSync(dir, {withFileTypes: true})
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const folder of folders) {
  const file = path.join(dir, folder, 'migration.sql');
  if (!existsSync(file)) continue;
  console.log('Applying', folder);
  await client.executeMultiple(readFileSync(file, 'utf-8'));
}

console.log('Done');
