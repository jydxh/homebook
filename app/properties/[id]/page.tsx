import AddFav from "@/components/form/AddFav";
import ShareBtn from "@/components/property/ShareBtn";
import {
	fetchFavList,
	fetchPropertyById,
} from "@/utils/actions/PropertyActions";
import { redirect } from "next/navigation";
import PropertyGallery from "@/components/property/PropertyGallery";
import CountryAndFlag from "@/components/home/CountryAndFlag";
import { TCountryCode } from "countries-list";
import RoomDetail from "@/components/property/RoomDetail";
import Image from "next/image";
import calculateYearDiff from "@/utils/calculateYearDiff";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyAmenities from "@/components/property/PropertyAmenities";

async function page({ params }: { params: { id: string } }) {
	const property = await fetchPropertyById(params.id);
	console.log(property);
	const favList = await fetchFavList();
	if (!property) {
		return redirect("/");
	}
	const {
		name,
		tagline,
		image,
		country,
		description,
		id,
		bedrooms,
		baths,
		guests,
		reviews,
		user,
		amenities,
	} = property;
	const isFav = favList.includes(id);
	const images = JSON.parse(image as string) as string[];
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
					/>
					<AddFav propertyId={id} isFav={isFav} withTxt={true} />
				</div>
			</div>
			<PropertyGallery images={images} />
			<div className="grid grid-cols-1 md:grid-cols-3">
				<div className="md:col-span-2">
					<div className="mt-8">
						<CountryAndFlag country={country as TCountryCode} detailPage />
						<RoomDetail bedrooms={bedrooms} baths={baths} guests={guests} />
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
				</div>
				{/* reservation and picking date here */}
				<div className="md:col-span-1">make reservation otions here,</div>
			</div>
		</section>
	);
}
export default page;
