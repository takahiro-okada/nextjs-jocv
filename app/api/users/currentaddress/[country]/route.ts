import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getCountryIdBySlug from '@/utils/getCountryIdBySlug';
import { enhanceUserData } from '@/utils/userDataEnhancer';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { country: string } }) {
  const { country } = params;
  const countryId = getCountryIdBySlug(country);

  try {
    const users = await prisma.user.findMany({
      where: {
        currentCountryId: countryId,
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
