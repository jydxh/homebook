"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import cloudinaryUpload from "./cloudinaryUpload";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) throw new Error("please log in first");
	return user;
};

export const updateAvatar = async (prevState: unknown, formData: FormData) => {
	const image = formData.get("image") as File;

	try {
		const user = await getAuthUser();
		if (image) {
			/* zod image validation logic */

			/* upload cloudinary */
			const imageUrl = await cloudinaryUpload(image);
			console.log(imageUrl);

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
		return { message: (error as Error).message };
	}
};
