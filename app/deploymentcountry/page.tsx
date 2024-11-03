import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import { AREAS } from '@/constants/area';
import { COUNTRIES } from '@/constants/countries';
import fetchCountryUserCounts from '../queries/fetchCountryUserCounts';
import GroupedCardGrid from '@/components/GroupedCardGrid';
import { CountryType } from '../type';

export default async function DispatchedCountry() {
  const countryUserCounts = await fetchCountryUserCounts();

  const groupedCountries = AREAS.WORLD.map((area) => {
    const countriesInArea = COUNTRIES.filter((country: CountryType) => country.continent === area.id);
    const cards = countriesInArea
      .filter((country: CountryType) => country.isDeveloping) // Filter developing countries
      .map((country: CountryType) => ({
        id: country.id,
        title: country.name,
        href: `/deploymentcountry/${country.slug}`,
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

      <main className="container mx-auto px-4">
        <SectionTitle title="派遣国" />
        <GroupedCardGrid groups={groupedCountries} />
      </main>

      <Footer />
    </>
  );
}
