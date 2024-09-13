import { PrismaClient } from '@prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    const userId = params.users;
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userIdNumber,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
