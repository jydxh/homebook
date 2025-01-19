import {
	fetchPropertyById,
	getVendorUser,
	updateRental,
} from "@/utils/actions/PropertyActions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddressInput from "@/components/createRental/AddressInput";
import Amenities from "@/components/createRental/Amenities";
import CategorySelection from "@/components/createRental/CategorySelection";
import CountrySelect from "@/components/createRental/CountrySelect";
import Description from "@/components/createRental/Description";
import RentalSizeInput from "@/components/createRental/RentalSizeInput";
//import UploadPropertyImage from "@/components/createRental/UploadPropertyImage";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UpdateRentalImages from "@/components/updateRental/UpdateRentalImages";

async function UpdateRentalPage({ params }: { params: { id: string } }) {
	const user = await currentUser();
	const isVendor = await getVendorUser(user?.id || "");
	if (!isVendor) return redirect("/");

	const property = await fetchPropertyById(params.id);
	//console.log(property);
	if (!property) {
		return redirect("/");
	}

	const { amenities } = property;
	const ameIds = amenities.map(ame => ame.amenitiesId);
	return (
		<section className="p-8">
			<h2 className="font-medium mx-auto w-full text-center text-2xl mb-4">
				Edit Rental
			</h2>
			<FormContainer action={updateRental}>
				<Card className="p-8">
					<h3 className="text-lg font-medium my-4">General Information</h3>
					<Separator className="mb-4" />

					<div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
						<FormInput
							maxLength={20}
							label="Name of Property"
							defaultValue={property.name}
							name="name"
							type="text"
							placeholder="max 20 characters"
						/>
						<FormInput
							maxLength={50}
							label="Tagline of Property"
							name="tagline"
							type="text"
							defaultValue={property.tagline}
							placeholder="max 50 characters"
						/>
						<FormInput
							label="Price"
							name="price"
							type="number"
							defaultValue={property.price}
						/>
						{/* category selection */}
						<CategorySelection defaultValue={property.categoryId} />
						{/* text area for description */}
						<Description defaultValue={property.description} />

						{/* country selection */}
						<CountrySelect defaultValue={property.country} />
					</div>

					{/* UPDATE PROPERTY IMAGES */}
					<div className="my-4">
						{/* <UploadPropertyImage /> */}
						<UpdateRentalImages images={property.image} />
					</div>
					{/* address Input with google map and google input search */}
					<AddressInput
						defaultAddress={property.address}
						defaultLatLng={JSON.parse(property.latLng) as google.maps.LatLng}
					/>

					<h3 className="text-lg font-medium mt-8 mb-4">
						Accommodation Details
					</h3>
					<Separator />
					{/* number of guests */}

					<div className="mt-8 grid lg:grid-cols-3 gap-8">
						<RentalSizeInput
							name="guests"
							label="Number of Guest"
							defaultValue={property.guests}
						/>
						<RentalSizeInput
							name="bedrooms"
							label="Number of Bedrooms"
							defaultValue={property.bedrooms}
						/>
						<RentalSizeInput
							name="baths"
							label="Number of baths"
							defaultValue={property.baths}
						/>
					</div>
					<h3 className="text-lg font-medium mt-8 mb-4">Amenities</h3>
					<Separator />
					<Amenities ameIds={ameIds} />
					<Separator className="my-8" />
					<div className="w-full mx-auto flex justify-center">
						<SubmitButton text="Update Rental" />
					</div>
				</Card>
			</FormContainer>
		</section>
	);
}
export default UpdateRentalPage;
