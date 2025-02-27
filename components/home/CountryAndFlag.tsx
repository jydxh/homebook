import { countries, TCountryCode } from "countries-list";
import Image from "next/image";
function CountryAndFlag({
	country,
	detailPage = false,
}: {
	country: TCountryCode;
	detailPage?: boolean;
}) {
	const countryName = countries[country].name;
	const flagUrl = `https://flagcdn.com/${country.toLowerCase()}.svg`;
	return (
		<div className="flex gap-x-2 items-center">
			<p className={detailPage ? " font-semibold text-lg" : ""}>
				{countryName}
			</p>
			<Image
				src={flagUrl}
				className="w-[30px] h-[18px] object-cover"
				width={30}
				height={18}
				alt={countryName}
			/>
		</div>
	);
}
export default CountryAndFlag;
