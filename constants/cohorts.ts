type Group = {
  id: string;
  name: string;
};

type Cohort = {
  id: string;
  year: number;
  japaneseEra: string;
  groups: Group[];
};

export const COHORTS: Cohort[] = [
  {
    id: 'pre-1990',
    year: 1989,
    japaneseEra: '1990年以前',
    groups: [{ id: '1', name: '1990年以前の隊次' }],
  },
  {
    id: '1990',
    year: 1990,
    japaneseEra: '平成2年',
    groups: [
      { id: '1', name: '平成2年度1次隊' },
      { id: '2', name: '平成2年度2次隊' },
      { id: '3', name: '平成2年度3次隊' },
      { id: '4', name: '平成2年度4次隊' },
    ],
  },
  {
    id: '1991',
    year: 1991,
    japaneseEra: '平成3年',
    groups: [
      { id: '1', name: '平成3年度1次隊' },
      { id: '2', name: '平成3年度2次隊' },
      { id: '3', name: '平成3年度3次隊' },
      { id: '4', name: '平成3年度4次隊' },
    ],
  },
  {
    id: '1992',
    year: 1992,
    japaneseEra: '平成4年',
    groups: [
      { id: '1', name: '平成4年度1次隊' },
      { id: '2', name: '平成4年度2次隊' },
      { id: '3', name: '平成4年度3次隊' },
      { id: '4', name: '平成4年度4次隊' },
    ],
  },
  {
    id: '1993',
    year: 1993,
    japaneseEra: '平成5年',
    groups: [
      { id: '1', name: '平成5年度1次隊' },
      { id: '2', name: '平成5年度2次隊' },
      { id: '3', name: '平成5年度3次隊' },
      { id: '4', name: '平成5年度4次隊' },
    ],
  },
  {
    id: '1994',
    year: 1994,
    japaneseEra: '平成6年',
    groups: [
      { id: '1', name: '平成6年度1次隊' },
      { id: '2', name: '平成6年度2次隊' },
      { id: '3', name: '平成6年度3次隊' },
      { id: '4', name: '平成6年度4次隊' },
    ],
  },
  {
    id: '1995',
    year: 1995,
    japaneseEra: '平成7年',
    groups: [
      { id: '1', name: '平成7年度1次隊' },
      { id: '2', name: '平成7年度2次隊' },
      { id: '3', name: '平成7年度3次隊' },
      { id: '4', name: '平成7年度4次隊' },
    ],
  },
  {
    id: '1996',
    year: 1996,
    japaneseEra: '平成8年',
    groups: [
      { id: '1', name: '平成8年度1次隊' },
      { id: '2', name: '平成8年度2次隊' },
      { id: '3', name: '平成8年度3次隊' },
      { id: '4', name: '平成8年度4次隊' },
    ],
  },
  {
    id: '1997',
    year: 1997,
    japaneseEra: '平成9年',
    groups: [
      { id: '1', name: '平成9年度1次隊' },
      { id: '2', name: '平成9年度2次隊' },
      { id: '3', name: '平成9年度3次隊' },
      { id: '4', name: '平成9年度4次隊' },
    ],
  },
  {
    id: '1998',
    year: 1998,
    japaneseEra: '平成10年',
    groups: [
      { id: '1', name: '平成10年度1次隊' },
      { id: '2', name: '平成10年度2次隊' },
      { id: '3', name: '平成10年度3次隊' },
      { id: '4', name: '平成10年度4次隊' },
    ],
  },
  {
    id: '1999',
    year: 1999,
    japaneseEra: '平成11年',
    groups: [
      { id: '1', name: '平成11年度1次隊' },
      { id: '2', name: '平成11年度2次隊' },
      { id: '3', name: '平成11年度3次隊' },
      { id: '4', name: '平成11年度4次隊' },
    ],
  },
  {
    id: '2000',
    year: 2000,
    japaneseEra: '平成12年',
    groups: [
      { id: '1', name: '平成12年度1次隊' },
      { id: '2', name: '平成12年度2次隊' },
      { id: '3', name: '平成12年度3次隊' },
      { id: '4', name: '平成12年度4次隊' },
    ],
  },
  {
    id: '2001',
    year: 2001,
    japaneseEra: '平成13年',
    groups: [
      { id: '1', name: '平成13年度1次隊' },
      { id: '2', name: '平成13年度2次隊' },
      { id: '3', name: '平成13年度3次隊' },
      { id: '4', name: '平成13年度4次隊' },
    ],
  },
  {
    id: '2002',
    year: 2002,
    japaneseEra: '平成14年',
    groups: [
      { id: '1', name: '平成14年度1次隊' },
      { id: '2', name: '平成14年度2次隊' },
      { id: '3', name: '平成14年度3次隊' },
      { id: '4', name: '平成14年度4次隊' },
    ],
  },
  {
    id: '2003',
    year: 2003,
    japaneseEra: '平成15年',
    groups: [
      { id: '1', name: '平成15年度1次隊' },
      { id: '2', name: '平成15年度2次隊' },
      { id: '3', name: '平成15年度3次隊' },
      { id: '4', name: '平成15年度4次隊' },
    ],
  },
  {
    id: '2004',
    year: 2004,
    japaneseEra: '平成16年',
    groups: [
      { id: '1', name: '平成16年度1次隊' },
      { id: '2', name: '平成16年度2次隊' },
      { id: '3', name: '平成16年度3次隊' },
      { id: '4', name: '平成16年度4次隊' },
    ],
  },
  {
    id: '2005',
    year: 2005,
    japaneseEra: '平成17年',
    groups: [
      { id: '1', name: '平成17年度1次隊' },
      { id: '2', name: '平成17年度2次隊' },
      { id: '3', name: '平成17年度3次隊' },
      { id: '4', name: '平成17年度4次隊' },
    ],
  },
  {
    id: '2006',
    year: 2006,
    japaneseEra: '平成18年',
    groups: [
      { id: '1', name: '平成18年度1次隊' },
      { id: '2', name: '平成18年度2次隊' },
      { id: '3', name: '平成18年度3次隊' },
      { id: '4', name: '平成18年度4次隊' },
    ],
  },
  {
    id: '2007',
    year: 2007,
    japaneseEra: '平成19年',
    groups: [
      { id: '1', name: '平成19年度1次隊' },
      { id: '2', name: '平成19年度2次隊' },
      { id: '3', name: '平成19年度3次隊' },
      { id: '4', name: '平成19年度4次隊' },
    ],
  },
  {
    id: '2008',
    year: 2008,
    japaneseEra: '平成20年',
    groups: [
      { id: '1', name: '平成20年度1次隊' },
      { id: '2', name: '平成20年度2次隊' },
      { id: '3', name: '平成20年度3次隊' },
      { id: '4', name: '平成20年度4次隊' },
    ],
  },
  {
    id: '2009',
    year: 2009,
    japaneseEra: '平成21年',
    groups: [
      { id: '1', name: '平成21年度1次隊' },
      { id: '2', name: '平成21年度2次隊' },
      { id: '3', name: '平成21年度3次隊' },
      { id: '4', name: '平成21年度4次隊' },
    ],
  },
  {
    id: '2010',
    year: 2010,
    japaneseEra: '平成22年',
    groups: [
      { id: '1', name: '平成22年度1次隊' },
      { id: '2', name: '平成22年度2次隊' },
      { id: '3', name: '平成22年度3次隊' },
      { id: '4', name: '平成22年度4次隊' },
    ],
  },
  {
    id: '2011',
    year: 2011,
    japaneseEra: '平成23年',
    groups: [
      { id: '1', name: '平成23年度1次隊' },
      { id: '2', name: '平成23年度2次隊' },
      { id: '3', name: '平成23年度3次隊' },
      { id: '4', name: '平成23年度4次隊' },
    ],
  },
  {
    id: '2012',
    year: 2012,
    japaneseEra: '平成24年',
    groups: [
      { id: '1', name: '平成24年度1次隊' },
      { id: '2', name: '平成24年度2次隊' },
      { id: '3', name: '平成24年度3次隊' },
      { id: '4', name: '平成24年度4次隊' },
    ],
  },
  {
    id: '2013',
    year: 2013,
    japaneseEra: '平成25年',
    groups: [
      { id: '1', name: '平成25年度1次隊' },
      { id: '2', name: '平成25年度2次隊' },
      { id: '3', name: '平成25年度3次隊' },
      { id: '4', name: '平成25年度4次隊' },
    ],
  },
  {
    id: '2014',
    year: 2014,
    japaneseEra: '平成26年',
    groups: [
      { id: '1', name: '平成26年度1次隊' },
      { id: '2', name: '平成26年度2次隊' },
      { id: '3', name: '平成26年度3次隊' },
      { id: '4', name: '平成26年度4次隊' },
    ],
  },
  {
    id: '2015',
    year: 2015,
    japaneseEra: '平成27年',
    groups: [
      { id: '1', name: '平成27年度1次隊' },
      { id: '2', name: '平成27年度2次隊' },
      { id: '3', name: '平成27年度3次隊' },
      { id: '4', name: '平成27年度4次隊' },
    ],
  },
];
