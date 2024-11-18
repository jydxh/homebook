const imageUrls = [
	"https://res.cloudinary.com/dudordakm/image/upload/v1729774446/Airbnb/zwdei9gof34pc2p82vyr.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729476976/Airbnb/pugjgljgnabrzamxaxs5.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729477131/Airbnb/oecnaqfeu8k8od7ybeh2.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1731254198/Airbnb/uycalr1hvfoo30e3cirq.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778473/tent3_p2peo1.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778473/hotel4_trapni.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778473/hotel5_sgwagm.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778473/tent2_seavlb.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778471/cabin2_fmkb2d.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729778471/cabin4_jmjlin.jpg",
	"https://res.cloudinary.com/dudordakm/image/upload/v1729774446/Airbnb/zwdei9gof34pc2p82vyr.jpg",
];
//.map(string => {
//	const stringArray = string.split("/");
//	const public_id = stringArray[stringArray.length - 1];
//	return { url: string, public_id };
//});

const shuttledUrls = [...imageUrls].sort(() => 0.5 - Math.random());
const result: string[][] = [];

for (let i = 0; i < shuttledUrls.length; i++) {
	const firstElement = shuttledUrls[i];

	/* a range between 1 to 3 */
	const arrayLength = Math.floor(Math.random() * 3) + 1;

	/* push the first unique element into innerArray */
	const innerArray = [firstElement];

	for (let j = 0; j < arrayLength; j++) {
		/* get a random url from the list */
		const randomUrl =
			shuttledUrls[Math.floor(Math.random() * shuttledUrls.length)];
		/* if the url not inside of the innerArray, just push it in */
		if (!innerArray.includes(randomUrl)) {
			innerArray.push(randomUrl);
		}
	}
	/* push the inner array into the outerArray */
	result.push(innerArray);
}

export default result;
