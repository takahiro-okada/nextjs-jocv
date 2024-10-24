import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import Image from 'next/image';
import fetchAllDeploymentLocations from '@/app/queries/fetchAllDeploymentLocations';

type Country = {
  id: string;
  name: string;
  slug: string;
  continent: string;
};

type DeploymentLocation = {
  country: Country;
  count: number;
};

export default async function DispatchedCountry() {
  const deploymentLocations: DeploymentLocation[] = await fetchAllDeploymentLocations();
  const groupedByContinent = deploymentLocations.reduce(
    (continentGroups, location) => {
      const continent = location.country.continent;
      if (!continentGroups[continent]) {
        continentGroups[continent] = [];
      }
      continentGroups[continent].push(location);
      return continentGroups;
    },
    {} as Record<string, DeploymentLocation[]>,
  );

  return (
    <>
      <Header />

      <main className="container mx-auto px-4">
        <SectionTitle title="派遣国" />

        <div className="mt-8">
          {Object.entries(groupedByContinent).map(([continent, locations]) => (
            <div key={continent} className="mb-10">
              <h3 className="mb-6 text-2xl font-bold">{continent}</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {locations.map((deploymentLocation) => {
                  const flagPath = `/images/flags/tz.svg`;
                  return (
                    <li key={deploymentLocation.country.id} className="overflow-hidden rounded-lg border">
                      <Link
                        href={`/deploymentlocations/${deploymentLocation.country.slug}`}
                        className="block bg-white p-4 transition-colors hover:bg-blue-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold">{deploymentLocation.country.name}</h4>
                            <span className="mt-1 inline-block rounded-full bg-blue-500 px-2 py-1 text-sm text-white">
                              {deploymentLocation.count}人
                            </span>
                          </div>
                          <Image
                            src={flagPath || '/images/flags/unknown.svg'}
                            alt={`${deploymentLocation.country.name}の国旗`}
                            width={40}
                            height={40}
                            className="rounded-sm"
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
