'use client';
import HamburgerButton from '@/components/HamburgerButton';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header>
      <div className="flex justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="logo" width={30} height={30} />
          <h1 className="ml-3">協力隊の輪</h1>
        </Link>

        <div className="flex">
          {status === 'authenticated' ? (
            <Link href="/1">
              <Image src={session.user?.image ?? ``} alt="logo" width={45} height={45} />
            </Link>
          ) : (
            <Link href="/login" className="rounded-md px-4 py-2 text-white">
              ログイン
            </Link>
          )}
          <div className="ml-4 flex items-center">
            <HamburgerButton />
          </div>
        </div>
      </div>
    </header>
  );
}
