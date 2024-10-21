import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import { DeploymentLocation } from '@/app/type';
import fetchAllDeploymentLocations from '@/app/queries/fetchAllDeploymentLocations';
import Image from 'next/image';

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

      <main className="mx-4 mt-8">
        <SectionTitle title="派遣国" />

        <div className="mt-8">
          {Object.entries(groupedByContinent).map(([continent, locations]) => (
            <div key={continent} className="mb-10">
              <h3 className="mb-4 text-2xl font-bold">{continent}</h3>
              <ul className="grid gap-4 md:grid-cols-3">
                {locations.map((deploymentLocation) => {
                  const flagPath = `/images/flags/tz.svg`;
                  return (
                    <li key={deploymentLocation.country.id}>
                      <Link
                        href={`/deploymentlocations/${deploymentLocation.country.slug}`}
                        className="flex justify-between rounded-md border border-gray-200 p-4 hover:bg-gray-50"
                      >
                        <div className="">
                          <h4 className="text-lg font-semibold">{deploymentLocation.country.name}</h4>
                          <p className="mt-2 text-sm text-gray-500">{deploymentLocation.count} 人</p>
                        </div>
                        <Image
                          src={flagPath || '/images/flags/unknown.svg'}
                          alt={`${deploymentLocation.country.name}の国旗`}
                          width={100}
                          height={100}
                        />
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
