import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
      select: {
        id: true,
        name: true,
        image: true,
        cohortYear: true,
        cohortGroup: true,
        deploymentCountryId: true,
        currentCountryId: true,
        currentPrefectureId: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
