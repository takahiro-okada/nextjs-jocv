type Cohort = {
  id: string;
  year: number;
  japaneseEra: string;
  groups: string[];
};

function getJapaneseEra(year: number): string {
  if (year >= 2019) {
    return `令和${year - 2018}`;
  } else if (year >= 1989) {
    return `平成${year - 1988}`;
  } else {
    return `昭和${year - 1925}`;
  }
}

export const COHORT_DATA: Cohort[] = [
  {
    id: 'pre-1990',
    year: 1989,
    japaneseEra: '1990以前',
    groups: ['1990年以前の隊次'],
  },
  ...Array.from({ length: 35 }, (_, index) => {
    const year = 1990 + index;
    const japaneseEra = getJapaneseEra(year);
    return {
      id: `${year}`,
      year,
      japaneseEra,
      groups: ['1次隊', '2次隊', '3次隊', '4次隊'].map((group) => `${japaneseEra}年度${group}`),
    };
  }),
];
