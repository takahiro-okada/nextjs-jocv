import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface CohortTerm {
  id: number;
  term: string;
  name: string;
  userCount: number;
}

interface GroupedCohorts {
  [key: string]: {
    year: string;
    terms: CohortTerm[];
    totalUsers: number;
  };
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

    const groupedCohorts: GroupedCohorts = cohorts.reduce((acc, cohort) => {
      if (cohort.users.length === 0) {
        return acc; // Skip cohorts with no users
      }

      const year = cohort.cohortYear === '1990以前' ? 'pre-1990' : cohort.cohortYear;
      if (!acc[year]) {
        acc[year] = {
          year: cohort.cohortYear,
          terms: [],
          totalUsers: 0,
        };
      }

      acc[year].terms.push({
        id: cohort.id,
        term: cohort.cohortTerm,
        name: cohort.name,
        userCount: cohort.users.length,
      });
      acc[year].totalUsers += cohort.users.length;

      return acc;
    }, {} as GroupedCohorts);

    // Sort the terms within each year
    Object.values(groupedCohorts).forEach((yearGroup) => {
      yearGroup.terms.sort((a, b) => parseInt(a.term) - parseInt(b.term));
    });

    // Convert the object to an array and sort by year
    const sortedCohorts = Object.values(groupedCohorts).sort((a, b) => {
      if (a.year === '1990以前') return -1;
      if (b.year === '1990以前') return 1;
      return parseInt(a.year) - parseInt(b.year);
    });

    return NextResponse.json(sortedCohorts);
  } catch (error) {
    console.error('Error fetching cohorts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
