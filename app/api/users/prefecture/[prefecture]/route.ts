import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { prefecture: string } }) {
  const { prefecture } = params;

  try {
    const users = await prisma.user.findMany({
      where: {
        currentPrefectureId: prefecture,
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
