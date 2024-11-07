import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import fetchCountryUserCounts from '../queries/fetchCountryUserCounts';
import GroupedCardGrid from '@/components/GroupedCardGrid';
import { getGroupedCountries } from '@/utils/countryUtils';

export default async function DeploymentCountry() {
  const countryUserCounts = await fetchCountryUserCounts();
  const groupedCountries = countryUserCounts ? getGroupedCountries(countryUserCounts, true) : [];

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
