import { NextResponse } from 'next/server';
import { createPrismaClient } from '@/app/libs/prisma';
import { enhanceUserData } from '@/utils/userDataEnhancer';


export async function GET(request: Request, props: { params: Promise<{ year: string }> }) {
  const prisma = createPrismaClient();
  const params = await props.params;
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
