import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
// import fetchAllDeploymentLocations from '@/app/queries/fetchAllDeploymentLocations';

export default async function DispatchedCountry() {
  // const deploymentLocations: DeploymentLocation[] = await fetchAllDeploymentLocations();

  return (
    <>
      <Header />

      <main className="mx-4 mt-8">
        <SectionTitle title="派遣国" />

        <div className="mt-8">
          <h3 className="text-2xl">アジア</h3>
          <div className="mt-10">
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {/* {deploymentLocations.map((deploymentlocation) => (
                <li key={deploymentlocation.country.id}>
                  <Link
                    href={`/deploymentlocations/${deploymentlocation.country.slug}`}
                    className="block rounded-md border border-gray-200 p-4 hover:bg-gray-50"
                  >
                    <h4 className="text-lg font-semibold">{deploymentlocation.country.name}</h4>
                    <p className="mt-2 text-sm text-gray-500">{deploymentlocation.count} 人</p>
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
