import { amenities } from "@/utils/amenities";

function PropertyAmenities({
	amenitiesList,
}: {
	amenitiesList: {
		propertyId: string;
		amenitiesId: string;
	}[];
}) {
	const existedAmenitiesList = amenities.filter(ame =>
		amenitiesList.map(list => list.amenitiesId).includes(ame.id)
	);
	return (
		<div className="mt-8">
			<h3 className="font-semibold text-lg">Amenities:</h3>
			<div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-4">
				{existedAmenitiesList.map(item => {
					return (
						<div
							key={item.name}
							className="flex justify-start items-center flex-wrap">
							<p className="flex justify-start gap-x-1 items-center cursor-default">
								{item.name}
								<item.icon className="w-4 h-4  text-muted-foreground" />
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default PropertyAmenities;
