import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface CohortTerm {
  id: string;
  term: string;
  name: string;
  userCount: number;
}

interface GroupedCohorts {
  year: string;
  terms: CohortTerm[];
  totalUsers: number;
}

export const GET = async () => {
  try {
    await prisma.$connect();
    const cohorts = await prisma.cohort.findMany({
      orderBy: {
        cohortYear: 'asc',
      },
      include: {
        users: true,
      },
    });

    const groupedCohorts: GroupedCohorts[] = cohorts.reduce((acc: GroupedCohorts[], cohort) => {
      const year = cohort.cohortYear === '1990以前' ? 'pre-1990' : cohort.cohortYear;
      let yearGroup = acc.find((group) => group.year === year);

      if (!yearGroup) {
        yearGroup = {
          year: cohort.cohortYear,
          terms: [],
          totalUsers: 0,
        };
        acc.push(yearGroup);
      }

      yearGroup.terms.push({
        id: cohort.id,
        term: cohort.cohortTerm,
        name: cohort.name,
        userCount: cohort.users.length,
      });
      yearGroup.totalUsers += cohort.users.length;

      return acc;
    }, []);

    // Sort the terms within each year
    groupedCohorts.forEach((yearGroup) => {
      yearGroup.terms.sort((a, b) => parseInt(a.term) - parseInt(b.term));
    });

    // Sort the years
    groupedCohorts.sort((a, b) => {
      if (a.year === '1990以前') return -1;
      if (b.year === '1990以前') return 1;
      return parseInt(a.year) - parseInt(b.year);
    });

    return NextResponse.json(groupedCohorts);
  } catch (error) {
    console.error('Error fetching cohorts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
