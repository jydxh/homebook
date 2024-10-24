const imageUrls = [
	"https://res.cloudinary.com/dudordakm/image/upload/v1729774446/Airbnb/zwdei9gof34pc2p82vyr.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729476976/Airbnb/pugjgljgnabrzamxaxs5.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729477131/Airbnb/oecnaqfeu8k8od7ybeh2.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778474/tent3_0.33x_bobxco.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778473/hotel5_sgwagm.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778473/tent2_seavlb.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778471/cabin2_fmkb2d.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778471/cabin4_jmjlin.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729774446/Airbnb/zwdei9gof34pc2p82vyr.jpg",
];

const shuttledUrls = [...imageUrls].sort(() => 0.5 - Math.random());
const result: string[][] = [];

for (let i = 0; i < shuttledUrls.length; i++) {
	const firstElement = shuttledUrls[i];

	/* a range between 1 to 3 */
	const arrayLength = Math.floor(Math.random() * 3) + 1;

	const innerArray = [firstElement];

	for (let j = 0; j < arrayLength; j++) {
		const randomUrl =
			shuttledUrls[Math.floor(Math.random() * shuttledUrls.length)];
		if (!innerArray.includes(randomUrl)) {
			innerArray.push(randomUrl);
		}
	}
	result.push(innerArray);
}

export default result;
