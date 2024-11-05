"use server";

import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "./actions";
import {
	ApplyVendorSchema,
	ImageSchema,
	UserProfileSchema,
	validateZodSchema,
} from "../zodSchema";
import { redirect } from "next/navigation";
import cloudinaryUpload from "../cloudinaryUpload";
import { renderError } from "./actions";

import { City, State, Country } from "country-state-city";

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
			country: formData.get("country"),
			city: formData.get("city"),
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
		return renderError(error);
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
		return profile;
	} catch (error) {
		console.log(error);
	}
};

export const updateUserProfile = async (prev: unknown, formData: FormData) => {
	try {
		const user = await getAuthUser();
		const rawData = Object.fromEntries(formData);
		const validatedFields = validateZodSchema(UserProfileSchema, rawData);
		const prevUserProfile = await fetchUserProfile();
		/* check if data not updates */
		if (
			validatedFields.firstName === prevUserProfile?.firstName &&
			validatedFields.lastName === prevUserProfile.lastName &&
			validatedFields.userName === prevUserProfile.userName &&
			validatedFields.city === prevUserProfile.city &&
			validatedFields.country === prevUserProfile.country &&
			validatedFields.state === prevUserProfile.state
		) {
			return {
				message: "update failed, please update user info before submit",
			};
		}
		/* check for the city, country, and state are validated string, this logic can be reused at create user profile action */

		const { country, city, state } = validatedFields;
		const isCountryPassed =
			Country.getAllCountries().findIndex(item => item.isoCode === country) !==
			-1;
		const isStatePassed =
			State.getStatesOfCountry(country).findIndex(
				item => item.isoCode === state
			) !== -1;
		const isCityPassed =
			City.getCitiesOfState(country, state).findIndex(
				item => item.name === city
			) !== -1;
		if (!isCountryPassed || !isStatePassed || !isCityPassed) {
			throw new Error("illegal input!");
		}
		/* push into db */
		await db.user.update({
			where: {
				clerkId: user.id,
			},
			data: {
				...validatedFields,
			},
		});
		revalidatePath("/profile");
		return { message: "updated user profile" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
};

export const vendorApplication = async (
	prevState: unknown,
	formData: FormData
) => {
	const rawData = Object.fromEntries(formData);
	const acceptTerms = formData.get("acceptTerm") as string | undefined;
	if (!acceptTerms || acceptTerms !== "on")
		return { message: "please check accept terms and conditions" };
	try {
		const user = await getAuthUser();
		const isVendorUser = await db.user.findFirst({
			where: {
				clerkId: user.id,
				role: "VENDOR",
			},
			select: {
				id: true,
			},
		});
		if (isVendorUser) {
			return { message: "role is vender, cannot reapply again" };
		}
		const lastApplyStatus = await db.vendorProfile.findMany({
			where: {
				userId: user.id,
			},
			select: {
				applicationStatus: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		/* check if last apply is approve or pending, if so return */
		console.log("lastApplyStatus:", lastApplyStatus);
		if (
			lastApplyStatus.length > 0 &&
			(lastApplyStatus[0].applicationStatus === "APPROVED" ||
				lastApplyStatus[0].applicationStatus === "PENDING")
		) {
			return { message: "cannot reapply" };
		}
		/* only if the last apply was denied or cancelled or it is first time apply can trigger the rest of code */
		const validatedFields = validateZodSchema(ApplyVendorSchema, rawData);
		const governmentIdUrl = cloudinaryUpload(validatedFields.governmentId);
		const addressProofUrl = cloudinaryUpload(validatedFields.proofOfAddress);

		const uploadResult = await Promise.all([governmentIdUrl, addressProofUrl]);
		console.log(uploadResult[0], uploadResult[1]);
		await db.vendorProfile.create({
			data: {
				...validatedFields,
				userId: user.id,
				governmentId: uploadResult[0],
				proofOfAddress: uploadResult[1],
			},
		});
		revalidatePath("/profile");
		return { message: "vendor application" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
};

export const fetchVendorProfileId = async () => {
	try {
		const user = await getAuthUser();
		return db.vendorProfile.findFirst({
			where: {
				userId: user.id,
				applicationStatus: "PENDING",
			},
			select: {
				id: true,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const cancelApplicationAction = async (
	id: string
): Promise<{ message: string }> => {
	try {
		const user = await getAuthUser();

		await db.vendorProfile.update({
			where: {
				id,
				userId: user.id,
			},
			data: {
				applicationStatus: "CANCELLED",
			},
		});
		revalidatePath("/profile");
		return { message: "cancel application" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
};
