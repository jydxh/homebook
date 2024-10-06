"use server";

import { currentUser } from "@clerk/nextjs/server";

import db from "@/utils/db";

export const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) throw new Error("please log in first");
	return user;
};
