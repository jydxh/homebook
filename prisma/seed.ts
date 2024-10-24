import { categories } from "../utils/categories";
import { amenities } from "../utils/amenities";
import db from "../utils/db";
import imageUrls from "../utils/imageUrls";

async function createProperties() {
	for (let i = 0; i < 1000; i++) {
		const categoryIndex = i % 9;
		const category = categories[categoryIndex];

		const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

		const randomAmenities = [...amenities]
			.sort(() => 0.5 - Math.random())
			.slice(0, Math.floor(Math.random() * 5) + 1);

		const property = await db.property.create({
			data: {
				id: `property_${i}`,
				name: `Property ${i}`,
				tagline: `Beautiful for property ${i}`,
				categoryId: category.id,
				image: JSON.stringify(randomImage),
				country: "CA",
				description: `A wonderful ${category.label} located in San Francisco.`,
				price: 100 * (i % 5) + 150,
				guests: Math.floor(Math.random() * 5) + 1,
				bedrooms: Math.floor(Math.random() * 5) + 1,
				baths: Math.floor(Math.random() * 3) + 1,
				address: "490 Post St, San Francisco, CA 94102",
				latLng: JSON.stringify({ lat: 37.7882282, lng: -122.4098041 }),
				userId: "user_2n4wkIqngrnLIIVdcyrvKhKv8cC",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		for (const amenity of randomAmenities) {
			await db.propertyAmenities.create({
				data: {
					propertyId: property.id, // Use the property id here
					amenitiesId: amenity.id, // Use the amenity id
				},
			});
		}
	}
}

createProperties()
	.then(() => console.log("Properties created successfully!"))
	.catch(e => {
		console.error(e);
	})
	.finally(async () => {
		await db.$disconnect();
	});
