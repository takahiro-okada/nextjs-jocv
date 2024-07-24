import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
