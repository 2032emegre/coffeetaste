export type CoffeeOrigin = {
  country: string;
  regions: string[];
};

export const coffeeOrigins: CoffeeOrigin[] = [
  // ...（既存のデータをそのまま）...
];

export const searchOrigins = (query: string): string[] => {
  const results: string[] = [];
  const lowerQuery = query.toLowerCase();
  coffeeOrigins.forEach((origin) => {
    if (origin.country.toLowerCase().includes(lowerQuery)) {
      results.push(origin.country);
    }
    origin.regions.forEach((region) => {
      if (region.toLowerCase().includes(lowerQuery)) {
        results.push(origin.country + ' ' + region);
      }
    });
  });
  return Array.from(new Set(results));
}; 