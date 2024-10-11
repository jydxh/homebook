import CategorySelection from "@/components/createRental/CategorySelection";
import CountrySelect from "@/components/createRental/CountrySelect";
import Description from "@/components/createRental/Description";
import FormInput from "@/components/form/FormInput";
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
				</div>

				{/* text area for description */}
				<Description />
				<div className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-4">
					{/* country selection */}
					<CountrySelect />
					UploadImage
				</div>
			</Card>
		</section>
	);
}
export default CreateRentalPage;
