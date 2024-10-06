import { ZodSchema } from "zod";
import * as z from "zod";

export const UserProfileSchema = z.object({
	userName: z
		.string()
		.max(20, { message: "userName cannot over 20 characters" }),
	firstName: z.string().max(50, { message: "firstName cannot over 50 chars" }),
	lastName: z.string().max(50, { message: "lastName cannot over 50 chars" }),
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
