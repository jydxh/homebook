import AddFav from "@/components/form/AddFav";
import ShareBtn from "@/components/property/ShareBtn";
import {
	fetchFavList,
	fetchPropertyById,
} from "@/utils/actions/PropertyActions";
import { redirect } from "next/navigation";

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
		</section>
	);
}
export default page;
