import { fetchProperties } from "@/utils/actions/PropertyActions";
import { Card } from "../ui/card";
import EmptyResult from "../EmptyResult";
import { FaStar } from "react-icons/fa6";
import DistanceAway from "./DistanceAway";
import CountryAndFlag from "./CountryAndFlag";
import { TCountryCode } from "countries-list";
import { formatCurrency } from "@/utils/formatCurrency";
import CarouselImages from "./CarouselImages";

async function HomePropertyList({
	searchParams,
	params,
}: {
	searchParams: unknown;
	params: unknown;
}) {
	console.log(searchParams);
	console.log(params);
	const properties = await fetchProperties();

	if (properties.length === 0) return <EmptyResult />;
	return (
		<section className="p-8 gap-x-8 gap-y-16 grid md:grid-cols-2 lg:grid-cols-3">
			{properties.map(item => {
				const { id, country, image, name, price, tagline, latLng } = item;
				const images = JSON.parse(image as string) as string[];
				return (
					<Card
						key={id}
						className="p-1 mx-auto rounded w-[75%] md:w-full hover:bg-muted">
						{/* carousel */}
						<CarouselImages images={images} name={name} />
						<div className="px-2 pb-2">
							<div className="flex justify-between mt-2">
								<p className="font-medium capitalize">{name}</p>
								<div className="flex items-center gap-x-2">
									<FaStar className="w-4 h-4" />
									<span>5.0 </span>
								</div>
							</div>
							<p className="text-muted-foreground truncate">{tagline}</p>
							<div className="flex justify-between">
								{/* xxx km away */}
								<DistanceAway latLng={latLng} />
								<CountryAndFlag country={country as TCountryCode} />
							</div>
							<p className="font-medium">{formatCurrency(price)} per night</p>
						</div>
					</Card>
				);
			})}

			{/* pagination */}
		</section>
	);
}
export default HomePropertyList;
