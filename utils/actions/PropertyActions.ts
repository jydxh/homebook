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
		console.log(validatedFields);
		/* use promises all to prevent waterfall */
		const imageUrls = await Promise.all(
			validatedImage.map(image => cloudinaryUpload(image.image))
		);

		const imageUrlsJson = JSON.stringify(imageUrls);
		const amenitiesArray = validatedFields.amenities
			.split(",")
			.map(name => name.trim());
		const amenities = await db.amenities.findMany({
			where: {
				name: {
					in: amenitiesArray,
				},
			},
		});

		await db.property.create({
			data: {
				...validatedFields,
				userId: user.id,
				image: imageUrlsJson,
				amenities: {
					connect: amenities.map(ame => ({ id: ame.id })),
				},
			},
		});
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
	redirect("/");
};
