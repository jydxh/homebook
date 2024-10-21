import AddressInput from "@/components/createRental/AddressInput";
import Amenities from "@/components/createRental/Amenities";
import CategorySelection from "@/components/createRental/CategorySelection";
import CountrySelect from "@/components/createRental/CountrySelect";
import Description from "@/components/createRental/Description";
import RentalSizeInput from "@/components/createRental/RentalSizeInput";
import UploadPropertyImage from "@/components/createRental/UploadPropertyImage";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createProperty } from "@/utils/actions/PropertyActions";
import { currentUser } from "@clerk/nextjs/server";
import { getVendorUser } from "@/utils/actions/PropertyActions";
import { redirect } from "next/navigation";

async function CreateRentalPage() {
	const user = await currentUser();
	const isVendor = await getVendorUser(user?.id || "");
	if (!isVendor) {
		return redirect("/");
	}
	return (
		<section className="p-8">
			<h2 className="font-medium mx-auto w-full text-center text-2xl mb-4">
				Create Rental
			</h2>
			<FormContainer action={createProperty}>
				<Card className="p-8">
					<h3 className="text-lg font-medium my-4">General Information</h3>
					<Separator className="mb-4" />

					<div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
						<FormInput
							maxLength={20}
							label="Name of Property"
							name="name"
							type="text"
							placeholder="max 20 characters"
						/>
						<FormInput
							maxLength={50}
							label="Tagline of Property"
							name="tagline"
							type="text"
							placeholder="max 50 characters"
						/>
						<FormInput label="Price" name="price" type="number" />
						{/* category selection */}
						<CategorySelection />
						{/* text area for description */}
						<Description />

						{/* country selection */}
						<CountrySelect />
					</div>

					{/* profile image upload */}
					<div className="mt-4">
						<UploadPropertyImage />
					</div>
					{/* address Input with google map and google input search */}
					<AddressInput />

					<h3 className="text-lg font-medium mt-8 mb-4">
						Accommodation Details
					</h3>
					<Separator />
					{/* number of guests */}

					<div className="mt-8 grid lg:grid-cols-3 gap-8">
						<RentalSizeInput name="guests" label="Number of Guest" />
						<RentalSizeInput name="bedrooms" label="Number of Bedrooms" />
						<RentalSizeInput name="baths" label="Number of baths" />
					</div>
					<h3 className="text-lg font-medium mt-8 mb-4">Amenities</h3>
					<Separator />
					<Amenities />
					<Separator className="my-8" />
					<div className="flex justify-start gap-x-8">
						<SubmitButton text="Create Rental" />
						<Button type="reset" variant="secondary">
							Reset
						</Button>
					</div>
				</Card>
			</FormContainer>
		</section>
	);
}
export default CreateRentalPage;
