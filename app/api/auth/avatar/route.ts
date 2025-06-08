import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import db from "@/utils/db";
import { ImageSchema, validateZodSchema } from "@/utils/zodSchema";
import cloudinaryUpload from "@/utils/cloudinaryUpload";

export const POST = async (request: NextRequest) => {
	const { userId } = getAuth(request);
	if (!userId)
		return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

	try {
		const formData = await request.formData();

		const avatar = formData.get("avatar");

		if (!avatar || !(avatar instanceof File))
			return NextResponse.json({ msg: "no image uploaded" }, { status: 400 });

		const validatedImage = validateZodSchema(ImageSchema, { image: avatar });
		/* upload to the cloudinary */
		const imageUrl = await cloudinaryUpload(validatedImage.image);
		/* update the user Image table  */
		const result = await db.user.update({
			where: {
				clerkId: userId,
			},
			data: {
				profileImage: imageUrl,
			},
		});

		return NextResponse.json({ imageUrl }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "internal server error" }, { status: 500 });
	}
};
