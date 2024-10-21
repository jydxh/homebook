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
import { amenitiesId } from "../amenities";

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
	const amenities = searchParams.amenities?.split(",") || amenitiesId;
	console.log(amenities);

	try {
		const propertyList = await db.property.findMany({
			where: {
				OR: [{ name: { contains: search } }, { tagline: { contains: search } }],
				AND: [
					{ categoryId },
					// {
					// 	/* looking for property where amenities in the listOfAmenities from client like ('10','20','30') */
					// 	amenities: {
					// 		/* some: Returns all records where one or more ("some") related records match filtering criteria.  */
					// 		some: {
					// 			id: { in: amenities },
					// 		},
					// 	},
					// },
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
			},
		});
		return propertyList;
	} catch (error) {
		console.log(error);
		return [];
	}
};
