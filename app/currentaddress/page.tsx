import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import GroupedCardGrid from '@/components/GroupedCardGrid';
import { PREFECTURES, AREAS } from '@/constants/prefectures';
import { PrefectureType } from '@/app/type';
import fetchPrefectureUserCounts from '@/app/queries/fetchPrefectureUserCounts';
import fetchCountryUserCounts from '../queries/fetchCountryUserCounts';
import { getGroupedCountries } from '@/utils/countryUtils';

export default async function CurrentAddress() {
  const prefectureUserCounts = await fetchPrefectureUserCounts();
  const countryUserCounts = await fetchCountryUserCounts();

  const groupedPrefectures = AREAS.JAPAN.map((area) => {
    const prefecturesInArea = PREFECTURES.filter((prefecture) => prefecture.areaId === area.id);
    const cards = prefecturesInArea.map((prefecture: PrefectureType) => ({
      id: prefecture.id.toString(),
      title: prefecture.name,
      href: `/currentaddress/japan/${prefecture.slug}`,
      count:
        prefectureUserCounts && prefectureUserCounts[prefecture.id]
          ? prefectureUserCounts[prefecture.id].toString()
          : '0',
    }));

    return {
      title: area.name,
      cards: cards,
    };
  });

  const groupedCountries = countryUserCounts ? getGroupedCountries(countryUserCounts) : [];
  console.log(groupedCountries[0].cards[0]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle title="現住所" />
        <h2 className="mb-8 mt-6 text-2xl font-bold">日本</h2>
        <GroupedCardGrid groups={groupedPrefectures} />
        <h2 className="mb-8 mt-6 text-2xl font-bold">海外</h2>
        <GroupedCardGrid groups={groupedCountries} />
      </main>
      <Footer />
    </>
  );
}
