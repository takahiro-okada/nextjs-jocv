import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { enhanceUserData } from '@/utils/userDataEnhancer';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { year: string } }) {
  const { year } = params;

  try {
    const cohortYear = parseInt(year, 10);

    if (isNaN(cohortYear)) {
      return NextResponse.json({ error: 'Invalid year parameter' }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: {
        cohortYear: year,
      },
    });

    const enhancedUsers = users.map(enhanceUserData);

    return NextResponse.json(enhancedUsers);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
