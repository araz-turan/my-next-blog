import 'dotenv/config';
import {PrismaLibSql} from '@prisma/adapter-libsql';
import {PrismaClient} from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as {prisma?: PrismaClient};

function createClient() {
  // const adapter = new PrismaLibSql({
  //   url: process.env.DATABASE_URL!,
  // });
  const adapter = new PrismaLibSql({
    url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  return new PrismaClient({adapter});
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
