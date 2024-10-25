import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const prefectures = await prisma.prefecture.findMany({});

    return NextResponse.json(prefectures);
  } catch (error) {
    console.error('Failed to fetch prefectures:', error);
    return NextResponse.json({ error: 'Failed to fetch prefectures' }, { status: 500 });
  }
}
