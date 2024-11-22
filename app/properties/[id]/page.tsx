import AddFav from "@/components/form/AddFav";
import ShareBtn from "@/components/property/ShareBtn";
import {
	fetchFavList,
	fetchPropertyById,
	fetchPropertyRating,
} from "@/utils/actions/PropertyActions";
import { redirect } from "next/navigation";
import PropertyGallery from "@/components/property/PropertyGallery";
import CountryAndFlag from "@/components/home/CountryAndFlag";
import { TCountryCode } from "countries-list";
import RoomDetail from "@/components/property/RoomDetail";
import Image from "next/image";
import calculateYearDiff from "@/utils/calculateYearDiff";
import { Separator } from "@/components/ui/separator";

import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyAmenities from "@/components/property/PropertyAmenities";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import dynamic from "next/dynamic";
import PropertyReviews from "@/components/property/PropertyReviews";
import PropertyReserve from "@/components/property/PropertyReserve";
import { currentUser } from "@clerk/nextjs/server";
import { hasProfile } from "@/utils/actions/ProfileActions";

const PropertyLeaflet = dynamic(
	() => import("@/components/property/PropertyLeaflet"),
	{ ssr: false, loading: () => <Skeleton className="mt-12 w-full h-[50vh]" /> }
);

async function page({ params }: { params: { id: string } }) {
	const property = await fetchPropertyById(params.id);
	//	console.log(property);
	const favList = await fetchFavList();
	if (!property) {
		return redirect("/");
	}
	const {
		name,
		image,
		country,
		description,
		id,
		bedrooms,
		baths,
		guests,
		user,
		amenities,
		address,
		latLng,
		price,
	} = property;

	const isFav = favList.includes(id);
	const images = image.map(img => img.imageUrl) as string[];
	const { count, rating } = await fetchPropertyRating(id);
	const loginUser = await currentUser();
	const hasUserProfile = await hasProfile(loginUser?.id);
	return (
		<section className="mx-auto max-w-[1280px] px-8">
			<div className="flex justify-between items-center">
				<h2 className="my-4 font-medium text-2xl tracking-wide">{name}</h2>
				<div className="flex items-center gap-2">
					<ShareBtn
						image={images[0]}
						name={name}
						countryCode={country}
						bedrooms={bedrooms}
						baths={baths}
						guests={guests}
						propertyId={id}
					/>
					<AddFav
						propertyId={id}
						isFav={isFav}
						withTxt={true}
						hasUserProfile={Boolean(hasUserProfile)}
					/>
				</div>
			</div>
			<PropertyGallery images={images} />
			<Separator className="my-4" />
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
				<div className="col-span-3 lg:col-span-2">
					<div className="mt-8">
						<CountryAndFlag country={country as TCountryCode} detailPage />
						<RoomDetail
							bedrooms={bedrooms}
							baths={baths}
							guests={guests}
							propertyId={id}
						/>
					</div>
					{/* vendor info */}
					<div className="flex gap-x-4 items-center mt-8">
						{/* this image should be wrapped by link href to the user page */}
						<Image
							src={
								user.profileImage ||
								"https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=1380"
							}
							alt="vendor avatar"
							width={50}
							height={50}
							className="w-[50px] h-[50px] rounded-full"
						/>
						<div>
							<p className="font-medium">
								Hosted by <span className="capitalize">{user.firstName}</span>
							</p>
							<p className="text-muted-foreground capitalize">
								SuperHost &middot; {calculateYearDiff(user.createAt)} hosting
							</p>
						</div>
					</div>
					<Separator className="mt-4" />
					{/* description */}

					<PropertyDescription description={description} />

					{/* amenities */}
					<PropertyAmenities amenitiesList={amenities} />

					{/* leaflet map  */}
					<Suspense fallback={<Skeleton className="w-[50vw] h-[50vh]" />}>
						<PropertyLeaflet address={address} latLngString={latLng} />
					</Suspense>
				</div>
				{/* reservation and picking date here */}

				{/* total review is hard coded here, later will fetch from db */}
				<PropertyReserve
					hasUserProfile={Boolean(hasUserProfile)}
					totalReview={count}
					price={price}
					rating={rating}
					name={name}
					image={images[0]}
				/>

				{/* reviews */}
				<PropertyReviews propertyId={id} />
			</div>
		</section>
	);
}
export default page;
