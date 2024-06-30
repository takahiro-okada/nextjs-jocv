import HamburgerButton from '@/components/HamburgerButton';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="flex justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="logo" width={30} height={30} />
          <h1 className="ml-3">協力隊の輪</h1>
        </Link>

        <div className="flex">
          <Link href="/profile/1">
            <Image src="/images/icon_oka.jpg" alt="logo" width={45} height={45} />
          </Link>
          <div className="ml-4 flex items-center">
            <HamburgerButton />
          </div>
        </div>
      </div>
    </header>
  );
}
