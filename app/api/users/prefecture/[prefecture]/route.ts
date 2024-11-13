import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { enhanceUserData } from '@/utils/userDataEnhancer';

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

    const enhancedUsers = users.map(enhanceUserData);

    return NextResponse.json(enhancedUsers);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
