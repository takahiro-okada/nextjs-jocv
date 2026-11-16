import { NextResponse } from 'next/server';
import { createPrismaClient } from '@/app/libs/prisma';
import { enhanceUserData } from '@/utils/userDataEnhancer';


export async function GET(request: Request, props: { params: Promise<{ prefecture: string }> }) {
  const prisma = createPrismaClient();
  const params = await props.params;
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
