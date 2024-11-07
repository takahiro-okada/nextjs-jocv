'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function HamburgerButton() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <button onClick={handleMenuOpen} type="button" className="relative space-y-2">
        <div className={openMenu ? 'h-0.5 w-8 translate-y-2.5 rotate-45 bg-gray-600' : 'h-0.5 w-8 bg-gray-600'} />
        <div className={openMenu ? 'opacity-0' : 'h-0.5 w-8 bg-gray-600'} />
        <div className={openMenu ? 'h-0.5 w-8 -rotate-45 bg-gray-600' : 'h-0.5 w-8 bg-gray-600'} />
      </button>

      {/* nav */}
      <nav
        className={
          openMenu
            ? 'fixed right-0 top-0 z-10 m-3 flex h-5/6 w-8/12 flex-col justify-start rounded-md bg-slate-50 px-3 pt-8 text-left'
            : 'fixed -right-full z-10'
        }
      >
        <ul className="mt-6">
          <li>
            <Link className="inline-block p-2" href="/">
              ホーム
            </Link>
          </li>
          <li>
            <Link className="inline-block p-2" href="/cohorts/">
              隊次から調べる
            </Link>
          </li>
          <li>
            <Link className="inline-block p-2" href="/deploymentcountry/">
              任地から調べる
            </Link>
          </li>
          <li>
            <Link className="inline-block p-2" href="/currentaddress/">
              現住所から調べる
            </Link>
          </li>
          <li>
            <Link className="inline-block p-2" href="/dashboard/setting/">
              設定
            </Link>
          </li>
        </ul>
      </nav>
      {/* backgroud */}
      <div onClick={handleMenuOpen} className={openMenu ? 'fixed inset-0 bg-black/50' : ''} />
    </>
  );
}
