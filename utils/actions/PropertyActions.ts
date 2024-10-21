"use server";

import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "./actions";
import { redirect } from "next/navigation";
import cloudinaryUpload from "../cloudinaryUpload";
import { renderError } from "./actions";
import {
	CreatePropertySchema,
	ImageSchema,
	validateZodSchema,
} from "../zodSchema";
import { HomePageSearchParam } from "@/app/page";
import { amenitiesIds } from "../amenities";

export const getVendorUser = async (clerkId: string) => {
	const isVendor = await db.user.findFirst({
		where: {
			clerkId,
			role: "VENDOR",
		},
		select: {
			id: true,
		},
	});
	if (!isVendor) {
		throw new Error("only vendor can create a property");
	}
	return true;
};

export const createProperty = async (
	prevState: unknown,
	formData: FormData
) => {
	try {
		const user = await getAuthUser(); // test if user login
		await getVendorUser(user.id); // test if user role is vendor
		const images = formData.getAll("images"); // get all the uploaded images
		if (images.length > 10) throw new Error("number images cannot over 10");
		const validatedImage = images.map(image => {
			return validateZodSchema(ImageSchema, { image });
		});
		const rawData = Object.fromEntries(formData);

		const validatedFields = validateZodSchema(CreatePropertySchema, rawData);

		/* use promises all to prevent waterfall */
		const imageUrls = await Promise.all(
			validatedImage.map(image => cloudinaryUpload(image.image))
		);

		const imageUrlsJson = JSON.stringify(imageUrls);
		/* later add more validation and sanitize */
		const amenitiesArray = (rawData.amenities as string)
			.split(",")
			.map(name => name.trim());

		// get amenities from DB
		const amenities = await db.amenities.findMany({
			where: {
				name: {
					in: amenitiesArray,
				},
			},
		});

		const newProperty = await db.property.create({
			data: {
				...validatedFields,
				userId: user.id,
				image: imageUrlsJson,
			},
			select: {
				id: true,
			},
		});
		/* add connection for each propertyAmenities */
		await db.propertyAmenities.createMany({
			data: amenities.map(ame => {
				return {
					propertyId: newProperty.id,
					amenitiesId: ame.id,
				};
			}),
		});

		//	return { message: "success!" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
	return redirect("/");
};

export const fetchProperties = async ({
	searchParams,
}: {
	searchParams: HomePageSearchParam;
}) => {
	console.log(searchParams);
	const search = searchParams.search?.toLowerCase() || "";
	const categoryId = searchParams.category;
	/* if user does not select any amenities, default will be any amenities, meaning DB will not do any filter amenities, only if client select and provide a list of amenities will the backend do filtering */
	const amenities = searchParams.amenities?.split(",") || amenitiesIds;
	console.log(amenities);

	try {
		const propertyList = await db.property.findMany({
			where: {
				OR: [{ name: { contains: search } }, { tagline: { contains: search } }],
				AND: [
					{ categoryId },
					{ amenities: { some: { amenitiesId: { in: amenities } } } },
				],
			},
			select: {
				id: true,
				name: true,
				tagline: true,
				price: true,
				country: true,
				image: true,
				latLng: true,
				amenities: true,
			},
		});
		//console.log(propertyList);

		if (amenities.length === amenitiesIds.length) return propertyList;

		// user:[1,2] amenities:[1,2,3,4,5] => true;
		// user: [1,2] amenities: [3,4,5] => false;
		// user: [1,2] amenities: [1,3,4,5] => false;
		/* logic: filter the propertyList, in the filter cb: get an array of amenityIds from the db, and then compare the user selected amenities, only if every value are included in the array of amenityIds will return true */
		const filteredPropertyList = propertyList.filter(property => {
			const amenityIds = property.amenities.map(ame => ame.amenitiesId);
			return amenities.every(ameId => amenityIds.includes(ameId));
		});
		return filteredPropertyList;
	} catch (error) {
		console.log(error);
		return [];
	}
};

// select * from property join property_amenities ON pr where (name like '%search%' or tagline like '%search%') and (categoryId = categoryId and amenities in (amenities))
/* 
select: {
	id: true,
	name: true,
	tagline: true,
	price: true,
	country: true,
	image: true,
	latLng: true,
},
 */
