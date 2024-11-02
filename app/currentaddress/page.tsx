import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import GroupedCardGrid from '@/components/GroupedCardGrid';
import { PREFECTURES, AREAS } from '@/constants/prefectures';
import { COUNTRIES } from '@/constants/countries';
import { PrefectureType } from '@/app/type';
import fetchPrefectureUserCounts from '@/app/queries/fetchPrefectureUserCounts';
import fetchCountryUserCounts from '../queries/fetchCountryUserCounts';

export default async function CurrentAddress() {
  const prefectureUserCounts = await fetchPrefectureUserCounts();
  const countryUserCounts = await fetchCountryUserCounts();

  const groupedPrefectures = AREAS.JAPAN.map((area) => {
    const prefecturesInArea = PREFECTURES.filter((prefecture) => prefecture.areaId === area.id);
    const cards = prefecturesInArea.map((prefecture: PrefectureType) => ({
      id: prefecture.id,
      title: prefecture.name,
      href: `/currentaddress/japan/${prefecture.slug}`,
      count: prefectureUserCounts && prefectureUserCounts[prefecture.id] ? prefectureUserCounts[prefecture.id] : '0',
    }));

    return {
      title: area.name,
      cards: cards,
    };
  });

  const groupedCountries = AREAS.WORLD.map((area) => {
    const countriesInArea = COUNTRIES.filter((country) => country.continent === area.id);
    const cards = countriesInArea.map((country) => ({
      id: country.id,
      title: country.name,
      href: `/currentaddress/world/${country.slug}`,
      count: countryUserCounts && countryUserCounts[country.id] ? countryUserCounts[country.id] : '0',
    }));

    return {
      title: area.name,
      cards: cards,
    };
  });

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionTitle title="現住所" />
        <h2 className="mb-8 text-2xl font-bold">日本</h2>
        <GroupedCardGrid groups={groupedPrefectures} />
        <h2 className="mb-8 text-2xl font-bold">海外</h2>
        <GroupedCardGrid groups={groupedCountries} />
      </main>
      <Footer />
    </>
  );
}
