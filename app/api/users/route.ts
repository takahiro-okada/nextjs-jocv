import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany({
      include: {
        currentAddress: {
          include: {
            prefecture: true,
            country: true,
          },
        },
        deploymentLocation: {
          include: {
            country: true,
          },
        },
        cohort: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
