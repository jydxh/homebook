"use server";

import db from "@/utils/db";

import { getAuthUser } from "./actions";
import { redirect } from "next/navigation";
import cloudinaryUpload from "../cloudinaryUpload";
import { renderError } from "./actions";
import {
	CreatePropertySchema,
	ImageSchema,
	validateZodSchema,
} from "../zodSchema";
import { HomePageSearchParam } from "@/app/page";
import { revalidatePath } from "next/cache";

export const getVendorUser = async (clerkId: string) => {
	const isVendor = await db.user.findFirst({
		where: {
			clerkId,
			role: "VENDOR",
		},
		select: {
			id: true,
		},
	});
	if (!isVendor) {
		throw new Error("only vendor can create a property");
	}
	return true;
};

export const createProperty = async (
	prevState: unknown,
	formData: FormData
) => {
	try {
		const user = await getAuthUser(); // test if user login
		await getVendorUser(user.id); // test if user role is vendor
		const images = formData.getAll("images"); // get all the uploaded images
		if (images.length > 10) throw new Error("number images cannot over 10");
		const validatedImage = images.map(image => {
			return validateZodSchema(ImageSchema, { image });
		});
		const rawData = Object.fromEntries(formData);

		const validatedFields = validateZodSchema(CreatePropertySchema, rawData);

		/* use promises all to prevent waterfall */
		const imageUrls = await Promise.all(
			validatedImage.map(image => cloudinaryUpload(image.image))
		);

		const imageUrlsJson = JSON.stringify(imageUrls);
		/* later add more validation and sanitize */
		const amenitiesArray = (rawData.amenities as string)
			.split(",")
			.map(name => name.trim());

		// get amenities from DB
		const amenities = await db.amenities.findMany({
			where: {
				name: {
					in: amenitiesArray,
				},
			},
		});

		const newProperty = await db.property.create({
			data: {
				...validatedFields,
				userId: user.id,
				image: imageUrlsJson,
			},
			select: {
				id: true,
			},
		});
		/* add connection for each propertyAmenities */
		await db.propertyAmenities.createMany({
			data: amenities.map(ame => {
				return {
					propertyId: newProperty.id,
					amenitiesId: ame.id,
				};
			}),
		});

		//	return { message: "success!" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
	return redirect("/");
};

export const fetchProperties = async ({
	searchParams,
}: {
	searchParams: HomePageSearchParam;
}) => {
	//console.log(searchParams);
	const search = searchParams.search?.toLowerCase() || "";
	const categoryId = searchParams.category;
	const priceSort = searchParams.price;
	const ratingSort = searchParams.rating;
	if (priceSort !== "asc" && priceSort !== "desc" && priceSort !== undefined)
		throw new Error("invalid price sort order");
	if (ratingSort !== "asc" && ratingSort !== "desc" && ratingSort !== undefined)
		throw new Error("invalid rating sort order");
	/* if user does not select any amenities, default will be [], meaning DB will not do any filter amenities, only if client select and provide a list of amenities will the backend do filtering */
	const amenities = searchParams.amenities?.split(",") || [];
	const page = searchParams.page || 1;
	const take = 20;

	try {
		const propertyList = await db.property.findMany({
			take,
			skip: (Number(page) - 1) * take,
			where: {
				OR: [{ name: { contains: search } }, { tagline: { contains: search } }],
				AND: [
					{ categoryId },
					// if amenities is empty, will not filter the amenities
					amenities.length > 0
						? { amenities: { some: { amenitiesId: { in: amenities } } } }
						: {},
				],
			},
			select: {
				id: true,
				name: true,
				tagline: true,
				price: true,
				country: true,
				image: true,
				latLng: true,
				amenities: true,
			},
			orderBy: [
				priceSort ? { price: priceSort } : { createdAt: "desc" },
				/* later after adding review model add logic here for sorting by raring here */
				/* 	{ rating: ratingSort } */
			],
		});
		// total count of items
		const totalCount = await db.property.count({
			where: {
				OR: [{ name: { contains: search } }, { tagline: { contains: search } }],
				AND: [
					{ categoryId },
					// if amenities is empty, will not filter the amenities
					amenities.length > 0
						? { amenities: { some: { amenitiesId: { in: amenities } } } }
						: {},
				],
			},
		});
		const totalPage = Math.ceil(totalCount / take);

		if (amenities.length === 0)
			return { totalPage, currentPage: page, totalCount, data: propertyList };

		// user:[1,2] amenities:[1,2,3,4,5] => true;
		// user: [1,2] amenities: [3,4,5] => false;
		// user: [1,2] amenities: [1,3,4,5] => false;
		/* logic: filter the propertyList, in the filter cb: get an array of amenityIds from the db, and then compare the user selected amenities, only if every value are included in the array of amenityIds will return true */
		const filteredPropertyList = propertyList.filter(property => {
			const amenityIds = property.amenities.map(ame => ame.amenitiesId);
			return amenities.every(ameId => amenityIds.includes(ameId));
		});

		return { data: filteredPropertyList, totalPage, currentPage: page };
	} catch (error) {
		console.log(error);
		return { totalPage: 0, currentPage: 1, totalCount: 0, data: [] };
	}
};

export const fetchFavList = async () => {
	try {
		const user = await getAuthUser();
		const userFavList = await db.favorite.findMany({
			where: {
				userId: user.id,
			},
			select: {
				propertyId: true,
			},
		});
		return userFavList.map(list => list.propertyId);
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const addFavAction = async (
	prevState: unknown,
	{ propertyId, path }: { propertyId: string; path: string }
) => {
	let message = "";
	try {
		const user = await getAuthUser();

		const existFav = await db.favorite.findFirst({
			where: {
				propertyId,
				userId: user.id,
			},
		});
		if (existFav) {
			await db.favorite.delete({
				where: {
					id: existFav.id,
				},
			});
			message = "Removed from my favorite list";
		} else {
			await db.favorite.create({
				data: {
					propertyId,
					userId: user.id,
				},
			});
			message = "Added to my favorite list";
		}
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
	revalidatePath(path);
	return { message };
};
