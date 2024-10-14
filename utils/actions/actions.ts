"use server";

import { currentUser } from "@clerk/nextjs/server";
import {
	PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) throw new Error("please log in first");
	return user;
};

export const renderError = (error: unknown): { message: string } => {
	return {
		message:
			error instanceof PrismaClientValidationError ||
			error instanceof PrismaClientKnownRequestError ||
			error instanceof PrismaClientUnknownRequestError
				? "internal server error"
				: error instanceof Error
				? error.message
				: "an error occurred, please try again",
	};
};
