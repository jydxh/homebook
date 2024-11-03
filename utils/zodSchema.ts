import { ZodSchema } from "zod";
import * as z from "zod";

export const UserProfileSchema = z.object({
	userName: z
		.string()
		.max(20, { message: "userName cannot over 20 characters" }),
	firstName: z.string().max(50, { message: "firstName cannot over 50 chars" }),
	lastName: z.string().max(50, { message: "lastName cannot over 50 chars" }),
	country: z.string().max(50, { message: "country cannot over 50 chars" }),
	city: z.string().max(50, { message: "city cannot over 50 chars" }),
});

export function validateZodSchema<T>(
	schema: ZodSchema<T>, // it is a type pf ZodSchema validates data of type T
	rawData: unknown
): T {
	const result = schema.safeParse(rawData);
	if (result.error) {
		console.log(result.error);
		const errorMsgs = result.error.errors.map(err => err.message).join(", ");
		throw new Error(errorMsgs);
	}
	return result.data;
}

export const ImageSchema = z.object({
	image: z
		.instanceof(File)
		.refine(
			file => {
				return !file || file.size < 1024 * 1024;
			},
			{ message: "File must be less than 1 MB" }
		)
		.refine(
			file => {
				const imageTypes = [
					"image/jpeg",
					"image/png",
					"image/gif",
					"image/webp",
				];
				return !file || imageTypes.includes(file.type);
			},
			{ message: "file must be an image" }
		),
});

function acceptImgAndPdf() {
	return z
		.instanceof(File)
		.refine(
			file => {
				return !file || file.size < 2 * 1024 * 1024;
			},
			{ message: "File must be less than 2 MB" }
		)
		.refine(
			file => {
				const fileTypes = [
					"image/jpeg",
					"image/png",
					"image/gif",
					"image/webp",
					"application/pdf",
				];
				return !file || fileTypes.includes(file.type);
			},
			{ message: "file must be an image or in pdf formate" }
		);
}

export const ApplyVendorSchema = z.object({
	businessName: z
		.string()
		.min(2, { message: "business name should not less than 2 characters" })
		.max(50, { message: "business name should not over 50 characters" }),
	businessAddress: z
		.string()
		.min(2, { message: "business address should not less than 2 characters" })
		.max(50, { message: "business address should not over 50 characters" }),
	governmentId: acceptImgAndPdf(),
	proofOfAddress: acceptImgAndPdf(),
});

export const CreatePropertySchema = z.object({
	name: z.string().max(20, { message: "name cannot over 20 characters" }),
	tagline: z.string().max(50, { message: "tagline cannot over 50 characters" }),
	price: z.coerce.number().nonnegative("price cannot be less than 0"),
	categoryId: z.string(),
	description: z
		.string()
		.min(20, { message: "min 20 characters" })
		.max(500, { message: "max 500 characters" }),
	country: z.string().length(2, "country code can only be 2 chars"),
	guests: z.coerce.number().nonnegative("guests cannot be less than 0"),
	bedrooms: z.coerce.number().nonnegative("bedrooms cannot be less than 0"),
	baths: z.coerce.number().nonnegative("baths cannot be less than 0"),
	address: z.string().max(200, { message: "address cannot be over 200 chars" }),
	latLng: z.string().max(400, { message: "latLng cannot over 400 chars" }),
});

export const reviewZodSchema = z.object({
	rating: z.coerce
		.number()
		.max(5, { message: "max rating is 5" })
		.min(1, { message: "min rating is 1" }),
	comment: z
		.string()
		.min(10, { message: "min chars of comment is 10" })
		.max(400, { message: "max chars of comment  is 400" }),
	propertyId: z.string(),
});
