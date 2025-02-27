import { fetchFavList, fetchProperties } from "@/utils/actions/PropertyActions";
import { Card } from "../ui/card";
import EmptyResult from "../EmptyResult";

import DistanceAway from "./DistanceAway";
import CountryAndFlag from "./CountryAndFlag";
import { TCountryCode } from "countries-list";
import { formatCurrency } from "@/utils/formatCurrency";
import CarouselImages from "./CarouselImages";
import { HomePageSearchParam } from "@/app/page";
import HomePagination from "./HomePagination";
import AddFav from "../form/AddFav";
import Link from "next/link";
import PropertyRating from "../property/PropertyRating";
import { hasProfile } from "@/utils/actions/ProfileActions";
import { currentUser } from "@clerk/nextjs/server";

async function HomePropertyList({
	searchParams,
}: {
	searchParams: HomePageSearchParam;
}) {
	const properties = await fetchProperties({ searchParams });
	const favList = await fetchFavList();
	//console.log(properties);
	const user = await currentUser();
	const hasUserProfile = await hasProfile(user?.id);

	if (properties.totalPage === 0) return <EmptyResult />;
	return (
		<>
			<section className="p-8 gap-x-8 gap-y-16 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{properties.data.map(item => {
					const { id, country, image, name, price, tagline, latLng } = item;
					const images = image.map(img => img.imageUrl);
					const isFav = favList.includes(id);
					return (
						<Card
							key={id}
							className="relative mx-auto rounded w-[75%] md:w-full hover:bg-muted ">
							<Link href={`/properties/${id}`}>
								{/* carousel */}
								<CarouselImages images={images} name={name} />
								<div className="px-2 pb-2">
									<div className="flex justify-between mt-2">
										<p className="font-medium capitalize">{name}</p>
										{/* <div className="flex items-center gap-x-2">
											<FaStar className="w-4 h-4" />
											<span>5.0 </span>
										</div> */}
										<PropertyRating propertyId={id} />
									</div>
									<p className="text-muted-foreground truncate">{tagline}</p>
									<div className="flex justify-between">
										{/* xxx km away */}
										<DistanceAway latLng={latLng} />
										<CountryAndFlag country={country as TCountryCode} />
									</div>
									<p className="font-medium">
										{formatCurrency(price)} per night
									</p>
								</div>
							</Link>

							<div className="absolute top-1 right-1">
								<AddFav
									propertyId={id}
									isFav={isFav}
									hasUserProfile={Boolean(hasUserProfile)}
								/>
							</div>
						</Card>
					);
				})}
			</section>
			{/* pagination */}
			{properties.totalPage > 1 && (
				<HomePagination
					currentPage={properties.currentPage}
					totalPage={properties.totalPage}
					totalCount={properties.totalCount || 0}
				/>
			)}
		</>
	);
}
export default HomePropertyList;
