import AddressInput from "@/components/createRental/AddressInput";
import Amenities from "@/components/createRental/Amenities";
import CategorySelection from "@/components/createRental/CategorySelection";
import CountrySelect from "@/components/createRental/CountrySelect";
import Description from "@/components/createRental/Description";
import RentalSizeInput from "@/components/createRental/RentalSizeInput";
import UploadPropertyImage from "@/components/createRental/UploadPropertyImage";
import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function CreateRentalPage() {
	return (
		<section className="p-8">
			<h2 className="font-medium mx-auto w-full text-center text-2xl mb-4">
				Create Rental
			</h2>
			<Card className="p-8">
				<h3 className="text-lg font-medium my-4">General Information</h3>
				<Separator className="mb-4" />
				<div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
					<FormInput
						label="Name of Property"
						name="name"
						type="text"
						placeholder="max 20 characters"
					/>
					<FormInput
						label="Tagline of Property"
						name="name"
						type="text"
						placeholder="max 20 characters"
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

				<h3 className="text-lg font-medium my-8">Accommodation Details</h3>
				<Separator />
				{/* number of guests */}

				<div className="mt-8 grid lg:grid-cols-3 gap-8">
					<RentalSizeInput name="guests" label="Number of Guest" />
					<RentalSizeInput name="bedrooms" label="Number of Bedrooms" />
					<RentalSizeInput name="baths" label="Number of baths" />
				</div>
				<h3 className="text-lg font-medium my-8">Amenities</h3>
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
		</section>
	);
}
export default CreateRentalPage;
