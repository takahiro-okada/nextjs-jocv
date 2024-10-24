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
      <main className="container mx-auto px-4 py-8">
        <div className="px-4">
          <div className="mx-auto mt-24 w-16">
            <Image src="/images/logo.png" alt="logo" width={150} height={150} />
          </div>
          <h1 className="mt-6 text-center text-2xl">協力隊の輪</h1>
          <div className="mt-10 text-center">
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
