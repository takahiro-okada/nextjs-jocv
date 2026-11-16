import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';
import { createAuthOptions } from '@/app/libs/auth';
import { createPrismaClient } from '@/app/libs/prisma';

async function handler(request: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  const prisma = createPrismaClient();
  try {
    return await NextAuth(createAuthOptions(prisma))(request, context);
  } finally {
    await prisma.$disconnect();
  }
}

export { handler as GET, handler as POST };
