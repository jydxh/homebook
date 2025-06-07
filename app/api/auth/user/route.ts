import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import db from "@/utils/db";
import { validateZodSchema } from "@/utils/zodSchema";

export const GET = async (request: NextRequest) => {
	const { userId } = getAuth(request);
	if (!userId)
		return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

	try {
		const profile = await db.user.findUnique({
			where: {
				clerkId: userId,
			},
			select: {
				clerkId: true,
				firstName: true,
				lastName: true,
				userName: true,
				country: true,
				state: true,
				city: true,
				profileImage: true,
				role: true,
				vendorProfile: {
					select: {
						applicationStatus: true,
					},
					orderBy: {
						createdAt: "desc",
					},
				},
			},
		});
		return NextResponse.json({ profile }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "internal error" }, { status: 500 });
	}
};

export const POST = async (request: NextRequest) => {
	const { userId } = getAuth(request);
	if (!userId)
		return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
	const updateInfoSchema = z.object({
		userName: z.string().min(6, "userName is required"),
		lastName: z.string().min(1, "lastName is required"),
		firstName: z.string().min(1, "firstName is required"),
	});

	try {
		const body = (await request.json()) as {
			userName: string;
			lastName: string;
			firstName: string;
		};
		const validatedData = validateZodSchema(updateInfoSchema, body);

		/* push into db */
		await db.user.update({
			where: {
				clerkId: userId,
			},
			data: {
				...validatedData,
			},
		});
		return NextResponse.json({ msg: "updated!" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "internal server error!" },
			{ status: 500 }
		);
	}
};
