import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { year: string; group?: string } }) {
  const { year, group } = params;

  try {
    if (!year || isNaN(parseInt(year, 10))) {
      return NextResponse.json({ error: 'Invalid year parameter' }, { status: 400 });
    }

    const whereClause: {
      cohortYear: string;
      cohortGroup?: string;
    } = {
      cohortYear: year,
    };

    if (group) {
      if (!['1', '2', '3', '4'].includes(group)) {
        return NextResponse.json({ error: 'Invalid group parameter' }, { status: 400 });
      }
      whereClause.cohortGroup = group;
    }

    const users = await prisma.user.findMany({
      where: whereClause,
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
