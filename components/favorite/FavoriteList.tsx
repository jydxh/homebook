import { Card } from "@/components/ui/card";
import CarouselImages from "@/components/home/CarouselImages";
import { FaStar } from "react-icons/fa";
import DistanceAway from "@/components/home/DistanceAway";
import CountryAndFlag from "@/components/home/CountryAndFlag";
import { formatCurrency } from "@/utils/formatCurrency";
import { TCountryCode } from "countries-list";
import AddFav from "@/components/form/AddFav";
import Link from "next/link";
import { fetchFavProperties } from "@/utils/actions/PropertyActions";
import EmptyResult from "../EmptyResult";
import { currentUser } from "@clerk/nextjs/server";
import { hasProfile } from "@/utils/actions/ProfileActions";

async function FavoriteList() {
	const properties = await fetchFavProperties(); // get the fav properties details

	const user = await currentUser();
	console.log("user from favList:", user);
	const hasUserProfile = await hasProfile(user?.id);

	console.log("properties:", properties);
	//const favList = await fetchFavList(); // get the fav list id
	if (properties.length === 0)
		return (
			<EmptyResult
				text="You have not add any property in the list yet"
				buttonText="Back to Home"
			/>
		);
	return (
		<section className="p-8 gap-x-8 gap-y-16 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{properties.map(property => {
				const { id, country, image, name, price, tagline, latLng } = property;
				const images = image.map(item => item.imageUrl);

				return (
					<Card
						key={id}
						className="relative mx-auto rounded w-[75%] md:w-full  hover:bg-muted ">
						<Link href={`/properties/${id}`} className="z-0">
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
						</Link>
						<div className="absolute top-1 right-1">
							<AddFav
								propertyId={id}
								isFav={true}
								hasUserProfile={Boolean(hasUserProfile)}
							/>
						</div>
					</Card>
				);
			})}
		</section>
	);
}
export default FavoriteList;
