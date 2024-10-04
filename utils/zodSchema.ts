import { z, ZodSchema } from "zod";

export const UserProfileSchema = z.object({
	userName: z
		.string()
		.max(20, { message: "userName cannot over 20 characters" }),
	firstName: z.string().max(50, { message: "firstName cannot over 50 chars" }),
	lastName: z.string().max(50, { message: "lastName cannot over 50 chars" }),
	email: z.string().email({ message: "invalid email address" }),
});

export function validateZodSchema<T>(
	schema: ZodSchema<T>, // it is a type pf ZodSchema validates data of type T
	rawData: unknown
): T {
	const result = schema.safeParse(rawData);
	if (result.error) {
		console.log(result.error);
		throw new Error();
	}
	return result.data;
}
