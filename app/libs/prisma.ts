import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Workers cannot share a database socket between separate requests.
export function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    maxUses: 1,
  });
  return new PrismaClient({ adapter });
}
