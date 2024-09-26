import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    await prisma.$connect();
    const deploymentCountries = await prisma.user.groupBy({
      by: ['deploymentCountryId'],
      _count: {
        deploymentCountryId: true,
      },
      where: {
        deploymentCountryId: {
          not: null,
        },
      },
    });

    const result = await Promise.all(
      deploymentCountries.map(async (country) => {
        const countryDetails = country.deploymentCountryId
          ? await prisma.country.findUnique({
              where: { id: country.deploymentCountryId },
            })
          : null;
        return {
          country: countryDetails,
          count: country._count.deploymentCountryId,
        };
      }),
    );

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
