'use client';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { status } = useSession();

  return (
    <>
      <Header />
      <main className="">
        <div className="px-4">
          <div className="w-16 mt-24 mx-auto">
            <Image src="/images/logo.png" alt="logo" width={150} height={150} />
          </div>
          <h1 className="text-2xl text-center mt-6">協力隊の輪</h1>
          <div className="text-center mt-10">
            {status === 'authenticated' ? (
              <Button onClick={() => signOut()}>ログアウト</Button>
            ) : (
              <Button onClick={() => signIn('google', {}, { prompt: 'login' })}>ログイン</Button>
            )}
          </div>

          <div className="mt-16">
            <p>JOCVのつながりは、青年海外協力隊のOBOGの向けのサービスです。</p>
            <p className="mt-6">
              自分の「名前」「隊次」「任地」「現在住んでいる場所」「SNS」情報を登録してOBOGと繋がるきっかけの場所です。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
