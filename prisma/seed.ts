import { categories } from "../utils/categories";
import { amenities } from "../utils/amenities";
import db from "../utils/db";
import imageUrls from "../utils/imageUrls";

const propertyName = [
	"Sunset Villa",
	"Ocean Breeze",
	"Mountain Retreat",
	"City Lights Apartment",
	"Countryside Cottage",
	"Lakeside Cabin",
	"Urban Loft",
	"Beachfront Bungalow",
	"Rustic Ranch",
	"Modern Mansion",
	"Cozy Condo",
	"Luxury Penthouse",
	"Historic Home",
	"Charming Chalet",
	"Seaside Sanctuary",
	"Forest Hideaway",
	"Desert Oasis",
	"Ski Lodge",
	"Garden Cottage",
	"Downtown Duplex",
];

const countryList = [
	"CA",
	"CN",
	"US",
	"GB",
	"FR",
	"DE",
	"IT",
	"ES",
	"AU",
	"JP",
	"BR",
	"IN",
	"RU",
	"ZA",
	"MX",
	"KR",
	"AR",
	"CL",
	"CO",
	"PE",
	"NL",
	"BE",
	"CH",
	"SE",
	"NO",
	"FI",
	"DK",
	"IE",
	"PT",
	"GR",
	"TR",
	"PL",
	"CZ",
	"HU",
	"AT",
	"NZ",
	"SG",
	"MY",
	"TH",
	"VN",
];
const addressList = [
	"123 Maple St, Springfield, IL 62701",
	"456 Oak St, Metropolis, IL 62960",
	"789 Pine St, Smallville, KS 66002",
	"101 Elm St, Gotham, NY 10001",
	"202 Birch St, Star City, CA 90001",
	"303 Cedar St, Central City, MO 64101",
	"404 Walnut St, Coast City, FL 33101",
	"505 Cherry St, Blüdhaven, NJ 07001",
	"606 Aspen St, Keystone City, PA 19101",
	"707 Hickory St, Fawcett City, WI 53201",
	"808 Willow St, Hub City, TX 73301",
	"909 Poplar St, Midway City, OH 44101",
	"111 Spruce St, Opal City, VA 23218",
	"222 Fir St, Ivy Town, MA 02101",
	"333 Redwood St, Gateway City, OR 97201",
	"444 Cypress St, Happy Harbor, RI 02801",
	"555 Sycamore St, Riverdale, GA 30301",
	"666 Magnolia St, Elmond, AZ 85001",
	"777 Dogwood St, New Carthage, NM 87501",
	"888 Juniper St, New Venice, LA 70112",
	"999 Palm St, New Themyscira, WA 98101",
	"121 Maple St, New York, NY 10001",
	"131 Oak St, Los Angeles, CA 90001",
	"141 Pine St, Chicago, IL 60601",
	"151 Elm St, Houston, TX 77001",
	"161 Birch St, Phoenix, AZ 85001",
	"171 Cedar St, Philadelphia, PA 19101",
	"181 Walnut St, San Antonio, TX 78201",
	"191 Cherry St, San Diego, CA 92101",
	"201 Aspen St, Dallas, TX 75201",
];
const latLngList = [
	JSON.stringify({ lat: 37.7749, lng: -122.4194 }), // San Francisco, CA
	JSON.stringify({ lat: 34.0522, lng: -118.2437 }), // Los Angeles, CA
	JSON.stringify({ lat: 40.7128, lng: -74.006 }), // New York, NY
	JSON.stringify({ lat: 41.8781, lng: -87.6298 }), // Chicago, IL
	JSON.stringify({ lat: 29.7604, lng: -95.3698 }), // Houston, TX
	JSON.stringify({ lat: 33.4484, lng: -112.074 }), // Phoenix, AZ
	JSON.stringify({ lat: 39.7392, lng: -104.9903 }), // Denver, CO
	JSON.stringify({ lat: 47.6062, lng: -122.3321 }), // Seattle, WA
	JSON.stringify({ lat: 32.7157, lng: -117.1611 }), // San Diego, CA
	JSON.stringify({ lat: 32.7767, lng: -96.797 }), // Dallas, TX
	JSON.stringify({ lat: 30.2672, lng: -97.7431 }), // Austin, TX
	JSON.stringify({ lat: 39.9526, lng: -75.1652 }), // Philadelphia, PA
	JSON.stringify({ lat: 38.9072, lng: -77.0369 }), // Washington, D.C.
	JSON.stringify({ lat: 42.3601, lng: -71.0589 }), // Boston, MA
	JSON.stringify({ lat: 36.1627, lng: -86.7816 }), // Nashville, TN
	JSON.stringify({ lat: 35.2271, lng: -80.8431 }), // Charlotte, NC
	JSON.stringify({ lat: 36.1699, lng: -115.1398 }), // Las Vegas, NV
	JSON.stringify({ lat: 45.5152, lng: -122.6784 }), // Portland, OR
	JSON.stringify({ lat: 33.749, lng: -84.388 }), // Atlanta, GA
	JSON.stringify({ lat: 25.7617, lng: -80.1918 }), // Miami, FL
	JSON.stringify({ lat: 44.9778, lng: -93.265 }), // Minneapolis, MN
	JSON.stringify({ lat: 39.9612, lng: -82.9988 }), // Columbus, OH
	JSON.stringify({ lat: 35.0844, lng: -106.6504 }), // Albuquerque, NM
	JSON.stringify({ lat: 37.3382, lng: -121.8863 }), // San Jose, CA
	JSON.stringify({ lat: 36.7378, lng: -119.7871 }), // Fresno, CA
	JSON.stringify({ lat: 39.7684, lng: -86.1581 }), // Indianapolis, IN
	JSON.stringify({ lat: 40.4406, lng: -79.9959 }), // Pittsburgh, PA
	JSON.stringify({ lat: 39.1031, lng: -84.512 }), // Cincinnati, OH
	JSON.stringify({ lat: 36.1539, lng: -95.9928 }), // Tulsa, OK
	JSON.stringify({ lat: 38.2527, lng: -85.7585 }), // Louisville, KY
];

async function createProperties() {
	for (let i = 0; i < 1000; i++) {
		const categoryIndex = i % 9;
		const category = categories[categoryIndex];

		const randomImages = imageUrls[
			Math.floor(Math.random() * imageUrls.length)
		].map(img => {
			return {
				imageUrl: img,
			};
		});

		const randomAmenities = [...amenities]
			.sort(() => 0.5 - Math.random())
			.slice(0, Math.floor(Math.random() * 5) + 1);

		const property = await db.property.create({
			data: {
				id: `property_${i}`,
				name: propertyName[Math.floor(Math.random() * 20)],
				tagline: `Beautiful ${propertyName[Math.floor(Math.random() * 20)]}`,
				categoryId: category.id,
				image: {
					create: [...randomImages],
				},
				country: countryList[Math.floor(Math.random() * countryList.length)],
				description: `A wonderful ${category.label} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
				price: Number(Math.floor(Math.random() * 1000).toFixed(0)),
				guests: Math.floor(Math.random() * 5) + 1,
				bedrooms: Math.floor(Math.random() * 5) + 1,
				baths: Math.floor(Math.random() * 3) + 1,
				address: addressList[Math.floor(Math.random() * addressList.length)],
				latLng: latLngList[Math.floor(Math.random() * latLngList.length)],
				userId: "user_2n4wkIqngrnLIIVdcyrvKhKv8cC",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});
		/* amenity table */
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
