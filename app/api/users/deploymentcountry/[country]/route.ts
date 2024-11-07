import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { country: string } }) {
  const { country } = params;

  try {
    const users = await prisma.user.findMany({
      where: {
        deploymentCountryId: country,
      },
    });

    if (users.length === 0) {
      return NextResponse.json(undefined);
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
