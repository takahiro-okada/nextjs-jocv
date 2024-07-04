'use client';
import { useState } from 'react';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();

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
            {showModal && (
              <div className="h-full fixed left-0 top-0 z-modal flex w-full overflow-hidden overscroll-none">
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="モーダルを閉じる"
                  className="fixed inset-0 z-1 w-full bg-black/10 outline-none backdrop-blur-sm transition-opacity duration-500 motion-safe:animate-fadeIn"
                ></button>
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="閉じる"
                  className="absolute top-6 right-6 z-100 grid aspect-square w-8 place-items-center rounded-full bg-[#a7abb1] text-white hover:bg-main-500 motion-safe:animate-fadeIn xs:top-8 xs:right-8"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div
                  datatype="modal"
                  className="relative z-1 m-auto max-h-[calc(100vh-30px)] w-[calc(100vw-30px)] overflow-y-auto rounded-3xl text-main-body shadow-2xl transition-all duration-300 motion-safe:animate-modalDefaultIn bg-white max-w-[400px]"
                >
                  <div className="px-6 py-12 sm:px-10">
                    <div>
                      <a className="flex flex-col items-center" href="/home">
                        <div className="mt-2.5 text-xl motion-safe:animate-fadeInSlow">協力隊の輪</div>
                      </a>
                      <p className="mt-5 text-sm leading-relaxed text-main-700">協力隊のOBOGのためのサービスです。</p>
                      <div className="mt-7">
                        <button
                          onClick={login}
                          className="inline-flex items-center justify-center duration-500 leading-[1.1] bg-main-bg text-main-body border border-main-300 rounded-full disabled:border-main-200 disabled:opacity-60 hover:bg-main-50 hover:border-main-400 hover:disabled:bg-main-bg text-sm py-3.5 px-4 w-full"
                        >
                          <Image src="/images/icon-google.png" alt="" width={20} height={20} />
                          Googleアカウントでログイン
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
