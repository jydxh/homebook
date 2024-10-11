import { countries, TCountryCode } from "countries-list";

let countryList: Array<{ name: string; code: TCountryCode }> = [];
// Object.key(counties) => get an array of key of the objet like['CA','CN'...]

for (const code of Object.keys(countries) as TCountryCode[]) {
	countryList = [...countryList, { name: countries[code].name, code }];
}

export { countryList };
