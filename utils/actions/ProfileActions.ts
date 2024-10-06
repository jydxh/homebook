"use server";

import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "./actions";
import {
	ImageSchema,
	UserProfileSchema,
	validateZodSchema,
} from "../zodSchema";
import { redirect } from "next/navigation";
import cloudinaryUpload from "../cloudinaryUpload";

export const updateAvatar = async (prevState: unknown, formData: FormData) => {
	const image = formData.get("image") as File;

	try {
		const user = await getAuthUser();
		if (image) {
			/* zod image validation logic */
			const validatedImage = validateZodSchema(ImageSchema, { image }); // since the Image_schema using the object and the key is image, so the second arg will need to be like {image: image}

			/* upload cloudinary */
			const imageUrl = await cloudinaryUpload(validatedImage.image);

			/* push image url into db user table */
			const result = await db.user.update({
				where: {
					clerkId: user.id,
				},
				data: {
					profileImage: imageUrl,
				},
			});
			revalidatePath("/profile");
			console.log(result);
			return { message: "upload success" };
		} else {
			throw new Error("image is required!");
		}
	} catch (error) {
		console.log(error);

		return { message: (error as Error).message ?? "failed update image" };
	}
};

export const createUserProfile = async (
	prevState: unknown,
	formData: FormData
) => {
	try {
		const user = await getAuthUser();
		const rawData = {
			userName: formData.get("userName"),
			lastName: formData.get("lastName"),
			firstName: formData.get("firstName"),
		};
		const image = (formData.get("image") as File) || null;
		const validatedFields = validateZodSchema(UserProfileSchema, rawData);
		console.log("image:", image);

		let imageURL: string | undefined;
		if (image && image.size > 0 && image.name !== "undefined") {
			const validatedImage = validateZodSchema(ImageSchema, image);

			imageURL = await cloudinaryUpload(validatedImage.image);
		}

		await db.user.create({
			data: {
				clerkId: user.id,
				...validatedFields,
				email: user.emailAddresses[0].emailAddress,
				profileImage: imageURL ?? user.imageUrl,
			},
		});
	} catch (error) {
		console.log(error);
		return { message: "failed" };
	}
	return redirect("/");
};

export const fetchUserProfile = async () => {
	try {
		const user = await getAuthUser();
		const profile = await db.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				clerkId: true,
				firstName: true,
				lastName: true,
				userName: true,
				profileImage: true,
			},
		});
		return profile;
	} catch (error) {
		console.log(error);
	}
};
