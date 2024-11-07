export const PREFECTURES = [
  // 北海道・東北
  { id: 1, name: '北海道', slug: 'hokkaido', countryId: 'JP', areaId: 'hokkaido_tohoku' },
  { id: 2, name: '青森県', slug: 'aomori', countryId: 'JP', areaId: 'hokkaido_tohoku' },
  { id: 3, name: '岩手県', slug: 'iwate', countryId: 'JP', areaId: 'hokkaido_tohoku' },
  { id: 4, name: '宮城県', slug: 'miyagi', countryId: 'JP', areaId: 'hokkaido_tohoku' },
  { id: 5, name: '秋田県', slug: 'akita', countryId: 'JP', areaId: 'hokkaido_tohoku' },
  { id: 6, name: '山形県', slug: 'yamagata', countryId: 'JP', areaId: 'hokkaido_tohoku' },
  { id: 7, name: '福島県', slug: 'fukushima', countryId: 'JP', areaId: 'hokkaido_tohoku' },

  // 関東
  { id: 8, name: '茨城県', slug: 'ibaraki', countryId: 'JP', areaId: 'kanto' },
  { id: 9, name: '栃木県', slug: 'tochigi', countryId: 'JP', areaId: 'kanto' },
  { id: 10, name: '群馬県', slug: 'gunma', countryId: 'JP', areaId: 'kanto' },
  { id: 11, name: '埼玉県', slug: 'saitama', countryId: 'JP', areaId: 'kanto' },
  { id: 12, name: '千葉県', slug: 'chiba', countryId: 'JP', areaId: 'kanto' },
  { id: 13, name: '東京都', slug: 'tokyo', countryId: 'JP', areaId: 'kanto' },
  { id: 14, name: '神奈川県', slug: 'kanagawa', countryId: 'JP', areaId: 'kanto' },

  // 中部
  { id: 15, name: '新潟県', slug: 'niigata', countryId: 'JP', areaId: 'chubu' },
  { id: 16, name: '富山県', slug: 'toyama', countryId: 'JP', areaId: 'chubu' },
  { id: 17, name: '石川県', slug: 'ishikawa', countryId: 'JP', areaId: 'chubu' },
  { id: 18, name: '福井県', slug: 'fukui', countryId: 'JP', areaId: 'chubu' },
  { id: 19, name: '山梨県', slug: 'yamanashi', countryId: 'JP', areaId: 'chubu' },
  { id: 20, name: '長野県', slug: 'nagano', countryId: 'JP', areaId: 'chubu' },
  { id: 21, name: '岐阜県', slug: 'gifu', countryId: 'JP', areaId: 'chubu' },
  { id: 22, name: '静岡県', slug: 'shizuoka', countryId: 'JP', areaId: 'chubu' },
  { id: 23, name: '愛知県', slug: 'aichi', countryId: 'JP', areaId: 'chubu' },

  // 近畿
  { id: 24, name: '三重県', slug: 'mie', countryId: 'JP', areaId: 'kinki' },
  { id: 25, name: '滋賀県', slug: 'shiga', countryId: 'JP', areaId: 'kinki' },
  { id: 26, name: '京都府', slug: 'kyoto', countryId: 'JP', areaId: 'kinki' },
  { id: 27, name: '大阪府', slug: 'osaka', countryId: 'JP', areaId: 'kinki' },
  { id: 28, name: '兵庫県', slug: 'hyogo', countryId: 'JP', areaId: 'kinki' },
  { id: 29, name: '奈良県', slug: 'nara', countryId: 'JP', areaId: 'kinki' },
  { id: 30, name: '和歌山県', slug: 'wakayama', countryId: 'JP', areaId: 'kinki' },

  // 中国
  { id: 31, name: '鳥取県', slug: 'tottori', countryId: 'JP', areaId: 'chugoku' },
  { id: 32, name: '島根県', slug: 'shimane', countryId: 'JP', areaId: 'chugoku' },
  { id: 33, name: '岡山県', slug: 'okayama', countryId: 'JP', areaId: 'chugoku' },
  { id: 34, name: '広島県', slug: 'hiroshima', countryId: 'JP', areaId: 'chugoku' },
  { id: 35, name: '山口県', slug: 'yamaguchi', countryId: 'JP', areaId: 'chugoku' },

  // 四国
  { id: 36, name: '徳島県', slug: 'tokushima', countryId: 'JP', areaId: 'shikoku' },
  { id: 37, name: '香川県', slug: 'kagawa', countryId: 'JP', areaId: 'shikoku' },
  { id: 38, name: '愛媛県', slug: 'ehime', countryId: 'JP', areaId: 'shikoku' },
  { id: 39, name: '高知県', slug: 'kochi', countryId: 'JP', areaId: 'shikoku' },

  // 九州・沖縄
  { id: 40, name: '福岡県', slug: 'fukuoka', countryId: 'JP', areaId: 'kyushu_okinawa' },
  { id: 41, name: '佐賀県', slug: 'saga', countryId: 'JP', areaId: 'kyushu_okinawa' },
  { id: 42, name: '長崎県', slug: 'nagasaki', countryId: 'JP', areaId: 'kyushu_okinawa' },
  { id: 43, name: '熊本県', slug: 'kumamoto', countryId: 'JP', areaId: 'kyushu_okinawa' },
  { id: 44, name: '大分県', slug: 'oita', countryId: 'JP', areaId: 'kyushu_okinawa' },
  { id: 45, name: '宮崎県', slug: 'miyazaki', countryId: 'JP', areaId: 'kyushu_okinawa' },
  { id: 46, name: '鹿児島県', slug: 'kagoshima', countryId: 'JP', areaId: 'kyushu_okinawa' },
  { id: 47, name: '沖縄県', slug: 'okinawa', countryId: 'JP', areaId: 'kyushu_okinawa' },
];

export const AREAS = {
  JAPAN: [
    { id: 'hokkaido_tohoku', name: '北海道・東北' },
    { id: 'kanto', name: '関東' },
    { id: 'chubu', name: '中部' },
    { id: 'kinki', name: '近畿' },
    { id: 'chugoku', name: '中国' },
    { id: 'shikoku', name: '四国' },
    { id: 'kyushu_okinawa', name: '九州・沖縄' },
  ],
  WORLD: [
    { id: 'asia', name: 'アジア' },
    { id: 'africa', name: 'アフリカ' },
    { id: 'europe', name: 'ヨーロッパ' },
    { id: 'north_america', name: '北米' },
    { id: 'south_america', name: '南米' },
    { id: 'oceania', name: 'オセアニア' },
  ],
};
