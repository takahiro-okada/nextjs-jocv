'use client';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { signIn } from 'next-auth/react';

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-4 mt-8">
        <h1 className="text-3xl font-extrabold">「協力隊の輪」の使い方</h1>
        <p className="mt-8">
          本サービスは、元協力隊員の岡田貴弘が個人で運営しています。本サービスは、協力隊員の方々が、協力隊の経験を共有し、つながることを目的としています。
        </p>
        <p className="mt-8">
          僕も26年1次隊でアフリカのタンザニアに派遣された経験があります。帰国後、仲の良かった隊員とは連絡を取り合っていましたが、その他の隊員とは疎遠になってしまいました。そのような経験を踏まえ、本サービスを立ち上げました。
        </p>
        <p className="mt-8">
          また、家の近所に実は大昔にタンザニアに派遣された先輩隊員が住んでいることがわかり、その先輩隊員との交流を通じて、協力隊の経験を共有することができました。そのような交流が、協力隊の経験をより深めることにつながると考えています。
        </p>
        <p className="mt-8">
          「協力隊の輪」ではGoogleアカウントを使ってログインすることができます。ログインすると、プロフィールを登録することができます。プロフィールには、協力隊の経験や、現在の活動内容、連絡先などを登録することができます。
        </p>
        <p className="mt-8">
          また、他の協力隊員のプロフィールを閲覧することができます。プロフィールには、協力隊の経験や、現在の活動内容、連絡先などが登録されています。気になる隊員がいれば、登録されているSNSサービスなどを通じてメッセージを送ることができます。
        </p>
        <div className="mt-8 text-center">
          <Button onClick={() => signIn('google', {}, { prompt: 'login' })}>ログイン</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
