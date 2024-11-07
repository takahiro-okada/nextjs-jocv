import { AREAS } from '@/constants/area';
import { COUNTRIES } from '@/constants/countries';
import { CountryType } from '@/app/type';

type CountryUserCounts = {
  [key: string]: number;
};

export function getGroupedCountries(countryUserCounts: CountryUserCounts, isDevelopingOnly: boolean = false) {
  return AREAS.WORLD.map((area) => {
    const countriesInArea = COUNTRIES.filter(
      (country) => country.continent === area.id && (!isDevelopingOnly || country.isDeveloping),
    );
    const cards = countriesInArea.map((country: CountryType) => ({
      id: country.id.toString(),
      title: country.name,
      href: isDevelopingOnly ? `/deploymentcountry/${country.slug}` : `/currentaddress/${country.slug}`,
      flagSrc: `/images/flags/${country.countryCode}.svg`,
      count: countryUserCounts && countryUserCounts[country.id] ? countryUserCounts[country.id].toString() : '0',
    }));

    return {
      title: area.name,
      cards: cards,
    };
  });
}
