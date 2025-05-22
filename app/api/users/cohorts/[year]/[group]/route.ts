import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { enhanceUserData } from '@/utils/userDataEnhancer';

const prisma = new PrismaClient();

export async function GET(request: Request, props: { params: Promise<{ year: string; group?: string }> }) {
  const params = await props.params;
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
