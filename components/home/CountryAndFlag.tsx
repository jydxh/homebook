import { countries, TCountryCode } from "countries-list";
import Image from "next/image";
function CountryAndFlag({ country }: { country: TCountryCode }) {
	const countryName = countries[country].name;
	const flagUrl = `https://flagcdn.com/${country.toLowerCase()}.svg`;
	return (
		<div className="flex gap-x-2 items-center">
			<p>{countryName}</p>
			<Image src={flagUrl} width={30} height={18} alt={countryName} />
		</div>
	);
}
export default CountryAndFlag;
