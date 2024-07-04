import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';

// import { PREFECTURES, Prefecture } from '@/constants/prefectures';

export default function Settings() {
  return (
    <>
      <Header />
      <main>
        <div className="m,x">
          <div className="mx-4 mt-10">
            <h1 className="text-2xl">設定</h1>
            <hr className="mt-3 mb-3" />
            {/* Profile Image */}
            <p>プロフィール画像</p>
            <div className="flex items-center gap-4.5">
              <input id="select-avatar" type="file" accept="image/*" className="absolute h-1 w-0 opacity-0" />
              <button className="inline-flex w-1/5">
                <Image
                  src="/images/icon_oka.jpg"
                  alt="profile"
                  width={150}
                  height={150}
                  className="w-16 h-16 rounded-full"
                />
              </button>
              <div className="mt-4 ml-2 border border-gray-300 rounded-xl px-4 py-4 w-4/5">
                <label htmlFor="select-avatar" className="border border-gray-300 bg-[#F7FAFC] rounded-xl px-4 py-2">
                  <span>画像を変更</span>
                </label>
              </div>
            </div>

            {/* 表示名 */}
            <div className="mt-6">
              <p>表示名</p>
              <input type="text" className="border border-gray-300 rounded-xl px-4 py-2 w-full" />
            </div>

            {/* 自己紹介 */}
            <div className="mt-6">
              <p>自己紹介</p>
              <textarea className="border border-gray-300 rounded-xl px-4 py-2 w-full" rows={5}></textarea>
            </div>

            {/* 現住所 */}
            <div className="mt-6">
              <p>現住所</p>
              {/* <select className="border border-gray-300 rounded-xl px-4 py-2 w-full">
                {PREFECTURES.map((prefecture: Prefecture) => (
                  <option key={prefecture.code} value={prefecture.name}>
                    {prefecture.name}
                  </option>
                ))}
              </select> */}
            </div>

            {/* 任地 */}
            <div className="mt-6">
              <p>任地</p>
              <select className="border border-gray-300 rounded-xl px-4 py-2 w-full">
                <option>タンザニア</option>
                <option>ケニア</option>
                <option>ウガンダ</option>
              </select>
            </div>

            {/* 隊次 */}
            <div className="mt-6">
              <p>隊次</p>
              <select className="border border-gray-300 rounded-xl px-4 py-2 w-full">
                <option>26年1次隊</option>
                <option>26年2次隊</option>
                <option>26年3次隊</option>
              </select>
            </div>

            {/* Twiiter */}
            <div className="mt-6">
              <p>Twitter</p>
              <input type="text" className="border border-gray-300 rounded-xl px-4 py-2 w-full" />
              <p className="text-sm mt-2 text-gray-500">※TwitterのアカウントIDを入力してください</p>
            </div>

            {/* Facebook */}
            <div className="mt-6">
              <p>Facebook</p>
              <input type="text" className="border border-gray-300 rounded-xl px-4 py-2 w-full" />
              <p className="text-sm mt-2 text-gray-500">※FacebookのアカウントIDを入力してください</p>
            </div>

            {/* Instagram */}
            <div className="mt-6">
              <p>Instagram</p>
              <input type="text" className="border border-gray-300 rounded-xl px-4 py-2 w-full" />
              <p className="text-sm mt-2 text-gray-500">※InstagramのアカウントIDを入力してください</p>
            </div>

            {/* Website */}
            <div className="mt-6">
              <p>Website</p>
              <input type="text" className="border border-gray-300 rounded-xl px-4 py-2 w-full" />
              <p className="text-sm mt-2 text-gray-500">※ブログやその他ご自身が発信活動している</p>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button className="bg-main-bg text-main-body border border-main-300 rounded-full px-4 py-2">
                更新する
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
