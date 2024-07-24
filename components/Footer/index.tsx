import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#F7FAFC] py-14">
      <div className="mx-4">
        <div className="mt-8 px-4">
          <ul className="grid grid-cols-2 gap-10">
            <li>
              <Link href="/">ホーム</Link>
            </li>
            <li>
              <Link href="/policy">規約とポリシー</Link>
            </li>
            <li>
              <Link href="/howto">使い方</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
