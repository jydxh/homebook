"use server";

import db from "@/utils/db";
import sanitizeHtml from "sanitize-html";

import { getAuthUser } from "./actions";

import cloudinaryUpload, { cloudinaryDelete } from "../cloudinaryUpload";
import { renderError } from "./actions";
import {
	CreatePropertySchema,
	ImageSchema,
	PropertyIdSchema,
	reviewZodSchema,
	validateZodSchema,
} from "../zodSchema";
import { HomePageSearchParam } from "@/app/page";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { calculateTotals } from "../calculateTotals";
import * as z from "zod";
import { formatDate } from "../formatDate";
import { timeStamp } from "console";

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
		throw new Error("only vendor can create or modify a property");
	}
	return true;
};

export const createProperty = async (
	prevState: unknown,
	formData: FormData
) => {
	let message = "";
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

		const imageToDb = imageUrls.map(img => ({ imageUrl: img }));

		const amenitiesArray = validatedFields.amenities
			.split(",")
			.map(name => name.trim());

		// get amenities from DB so make sure the id provided from front-end is correct
		const amenities = await db.amenities.findMany({
			where: {
				name: {
					in: amenitiesArray,
				},
			},
		});
		const {
			name,
			address,
			tagline,
			price,
			categoryId,
			description,
			country,
			guests,
			bedrooms,
			baths,
			latLng,
		} = validatedFields;
		const newProperty = await db.property.create({
			data: {
				name,
				tagline,
				price,
				categoryId,
				description,
				country,
				guests,
				bedrooms,
				baths,
				address,
				latLng,
				userId: user.id,
				image: {
					create: imageToDb,
				},
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

		message = "Property created!";
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
	return { message };
};

export const fetchProperties = async ({
	searchParams,
}: {
	searchParams: HomePageSearchParam;
}) => {
	//console.log(searchParams);
	const search = searchParams.search?.toLowerCase().trim() || "";

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
				OR: [
					{ name: { contains: search, mode: "insensitive" } },
					{ tagline: { contains: search, mode: "insensitive" } },
				],
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
				latLng: true,
				amenities: true,
				image: true,
			},
			orderBy: [
				priceSort ? { price: priceSort } : { createdAt: "desc" },
				/* later after adding review model add logic here for sorting by raring here */
				/* 	{ rating: ratingSort } */
			],
		});
		//console.log(propertyList);
		// total count of items
		let totalCount = await db.property.count({
			where: {
				OR: [
					{ name: { contains: search, mode: "insensitive" } },
					{ tagline: { contains: search } },
				],
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
		/* if user does not provide amenities filtering */
		if (amenities.length === 0)
			return {
				totalPage,
				currentPage: page,
				totalCount,
				data: propertyList,
			};

		// input:[1,2] amenities:[1,2,3,4,5] => true;
		// input: [1,2] amenities: [3,4,5] => false;
		// input: [1,2] amenities: [1,3,4,5] => false;
		/* logic: filter the propertyList, in the filter cb: get an array of amenityIds from the db, and then compare the user selected amenities, only if every value are included in the array of amenityIds will return true */
		const filteredPropertyList = propertyList.filter(property => {
			const amenityIds = property.amenities.map(ame => ame.amenitiesId);
			return amenities.every(ameId => amenityIds.includes(ameId));
		});
		totalCount = filteredPropertyList.length;
		/* add a delay to test ui */

		//await new Promise(res => setTimeout(res, 2000));
		return {
			data: filteredPropertyList,
			totalPage: Math.ceil(totalCount / take),
			totalCount,
			currentPage: page,
		};
	} catch (error) {
		console.log(error);
		return { totalPage: 0, currentPage: 1, totalCount: 0, data: [] };
	}
};

export const fetchFavList = async () => {
	try {
		const user = await currentUser();
		if (!user) return [];
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

export const fetchFavProperties = async () => {
	try {
		const user = await getAuthUser();
		//	console.log("user:", user);

		const properties = await db.favorite.findMany({
			where: {
				userId: user.id,
			},
			select: {
				property: {
					select: {
						id: true,
						name: true,
						tagline: true,
						price: true,
						country: true,
						image: true,
						latLng: true,
					},
				},
			},
		});
		return properties.map(item => item.property);
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const fetchPropertyById = async (id: string) => {
	try {
		const property = await db.property.findUnique({
			where: {
				id,
			},
			include: {
				image: { select: { imageUrl: true, id: true } },
				reviews: true,
				user: true,
				amenities: true,
				orders: true,
			},
		});
		return property;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createPropertyReview = async (
	prevState: unknown,
	formData: FormData
) => {
	let message = "";
	const propertyId = formData.get("propertyId") as string | null;
	try {
		const user = await getAuthUser();
		const madeReview = await findExistingReview(user.id, propertyId || "N/A");
		if (madeReview) {
			throw Error("this user cannot make review!");
		}

		const rawData = Object.fromEntries(formData);
		const validatedFields = validateZodSchema(reviewZodSchema, rawData);
		/* sanitize textArea content */
		const comment = sanitizeHtml(validatedFields.comment);

		await db.review.create({
			data: {
				...validatedFields,
				comment,
				userId: user.id,
			},
		});
		message = "Successfully created the review";
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
	revalidatePath(`/properties/${propertyId}`);
	return { message };
};

export const fetchPropertyReviews = async (id: string) => {
	try {
		const reviews = await db.review.findMany({
			where: {
				propertyId: id,
			},
			select: {
				comment: true,
				id: true,
				createAt: true,
				rating: true,
				user: {
					select: {
						clerkId: true,
						firstName: true,
						createAt: true,
						profileImage: true,
						city: true,
						country: true,
					},
				},
			},
			orderBy: {
				createAt: "desc",
			},
		});
		return reviews;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const findExistingReview = async (
	userId: string,
	propertyId: string
) => {
	return await db.review.findFirst({
		where: {
			userId,
			propertyId,
		},
	});
};

export const makeReservation = async (
	prevState: unknown,
	bookingData: {
		propertyId: string;
		checkIn: Date;
		checkOut: Date;
	}
) => {
	const { propertyId, checkIn, checkOut } = bookingData;
	let bookingId: null | string = null;
	try {
		const user = await getAuthUser();
		const property = await db.property.findUnique({
			where: {
				id: propertyId,
			},
			select: {
				price: true,
			},
		});
		if (!property) {
			return { message: "No property found!" };
		}
		const { totalNights, orderTotal } = calculateTotals({
			checkIn,
			checkOut,
			price: property.price,
		});

		// insert into order table
		const order = await db.order.create({
			data: {
				checkIn,
				checkOut,
				orderTotal,
				totalNight: totalNights,
				propertyId,
				userId: user.id,
			},
		});
		bookingId = order.id;

	
	} catch (error) {
		return renderError(error);
	}
	// redirect to the checkout front-end page
	redirect(`/checkout?bookingId=${bookingId}`);
};

export const fetchBookingList = async()=>{
	try {
		const user = await getAuthUser();

		const bookings = await db.order.findMany({
			where:{
				userId: user.id
			},
			select:{
				orderStatus:true,
				id:true,
				checkIn: true,
				checkOut: true,
				totalNight:true,
				property:{
					select:{
						name:true,
						image: {
							select:{
								imageUrl:true,
							}
						}
					}
				}
			},
			orderBy:{
				createdAt:'desc'
			}
		})
	
		return bookings;

	} catch (error) {
		console.log(error);
		return []
	}
}

export const fetchOrderDetail = async (bookingId:string) =>{
	const bookingIdSchema = z.string().uuid();

	try {
			const user = await getAuthUser();
			// validate the bookingId
		const validatedBookingId= 	validateZodSchema(bookingIdSchema,bookingId);
		
			const orderDetail = await db.order.findFirst({
				where:{
					id: validatedBookingId,
					userId:user.id
				},
				select:{
					id:true,
					checkIn:true,
					checkOut: true,
					createdAt: true,
					orderTotal:true,
					paymentStatus:true,
					totalNight:true,
					orderStatus:true,
					property:{
						select:{
							address:true,
							country:true,
							name:true,
							id:true,
							image: true,
							price:true,
						}
					}
				}
			})
			return orderDetail
	} catch (error) {
		console.log(error);
		return null;
	}
}	

export const cancelOrder = async(orderID:string)=>{
	const orderIDSchema = z.string().uuid();
	try {
		const validatedOrderId= 	validateZodSchema(orderIDSchema,orderID);
		const user = await getAuthUser();
		const order = await db.order.findFirst({
			where:{
				userId:user.id,
				id:validatedOrderId
			},
			select:{
				checkIn:true,
				orderStatus:true,
			}
		})
		if(!order){console.log('no order founded');return { message: 'No order found' }}
		if(order.orderStatus ==='CANCELED'){
			console.log('the order is cancelled');
			return {message:'the order is cancelled'}
		}
		/* check if the date is 48 hour before the checkIN */
		const now = new Date();
		const checkInDate = new Date(order.checkIn);
		now.setHours(0,0,0,0);
		checkInDate.setHours(0,0,0,0);
		const timeDiff = now.getTime() - checkInDate.getTime();
		const dayDiff = Math.abs(timeDiff)  / (1000* 60*60*24);
		if(dayDiff<2){
			console.log('cannot cancel the order in 48 hours of checkIn');
			return {message:'Cannot cancel the order within 48 hours of check-in'}
		}
	
		await db.order.update({
			where:{
				userId:user.id,
				id:validatedOrderId
			},
			data:{
				orderStatus:'CANCELED'
			},
		})
		redirect('/bookings');
		
	} catch (error) {
		console.log(error);
		return {message:'failed in cancel order'}
	}
}

export const fetchVendorsReservation = async({page,searchName}:{page:string|undefined; searchName:string|undefined})=>{
	const take = 10;
	if(page!==undefined &&  !Number(page)){
		console.error('page has to be numeric string!');
		return {reservations:[],totalCount:0}
	}
	const pageNumber= Number(page) ||1;
	const skip = (pageNumber-1)*take;
	
	try {
		const user = await getAuthUser();
		const reservations = await db.order.findMany({
			take,
			skip,
			orderBy:{
				createdAt:'desc',
			},
			where:{
				property:{
					userId:user.id
				},
				paymentStatus:true,
				...(searchName && {
					user:{
					OR:[
						{firstName: {contains:searchName, mode:'insensitive'}},
						{lastName: {contains:searchName, mode:'insensitive'}}
					]
				}
				})
			},
			select:{
				checkIn:true,
				property:{
					select:{
						name:true,
						id:true,
						address:true,
					}
				},
				id:true,
				totalNight:true,
				orderTotal:true,
				orderStatus:true,
				user:{
				select:	{firstName:true, lastName:true}
				}
			}
		})
		const totalCount = await db.order.count({
			where:{
				property:{
					userId:user.id
				},
				paymentStatus:true,
				...(searchName && {
					user:{
					OR:[
						{firstName: {contains:searchName, mode:'insensitive'}},
						{lastName: {contains:searchName, mode:'insensitive'}}
					]
				}
				})
			},
		})
		return {reservations, totalCount};
	} catch (error) {
		console.log(error);
		return{reservations:[], totalCount:0}
	}
}




export const checkInByVendor = async(orderId:string)=>{
	let message = "";
	try {
		const now = new Date().setHours(0,0,0,0);
		const user = await getAuthUser();
		const checkInDate = await db.order.findFirst({
			where:{
				id:orderId,
				userId:user.id
			},
			select:{
				checkIn:true
			}
		})
		if(now !== checkInDate?.checkIn.setHours(0,0,0,0) ){
			return	 {message: "cannot check in before or after the check in date!"};
		}
		await db.order.update({
			where:{
				userId:user.id,
				id:orderId
			},
			data:{
				orderStatus:"CHECKED"
			}
		})
		message = "Checked in the customer";
		
	} catch (error) {
		console.log(error);
		message="failed in check in customer, please try again!";
	}
	revalidatePath("/reservations");
	return {message}
}


export const fetchPropertyRating = async (propertyId: string) => {
	try {
		const result = await db.review.groupBy({
			by: ["propertyId"],
			_avg: {
				rating: true,
			},
			_count: {
				rating: true,
			},
			where: {
				propertyId,
			},
		});
		return {
			rating: result[0]?._avg.rating?.toFixed(1) ?? "N/A",
			count: result[0]?._count.rating ?? 0,
		};
	} catch (error) {
		return { rating: "N/A", count: 0 };
	}
};

export const fetchReviewsByUser = async () => {
	try {
		const user = await getAuthUser();
		const reviews = await db.review.findMany({
			where: {
				userId: user.id,
			},
			include: {
				property: {
					select: {
						name: true,
						image: true,
						country: true,
						id: true,
					},
				},
			},
			orderBy: {
				createAt: "desc",
			},
		});
		return reviews;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const fetchPropertyByUser = async (searchParams: URLSearchParams) => {
	const page = searchParams.get("page") || "1";
	const query = searchParams.get("query");
	const orderByPrice = searchParams.get("price");
	const orderByName = searchParams.get("name");
	const currentPage = Number(page);
	const pageSpan = 20;
	const offset = (currentPage - 1) * pageSpan;
	try {
		const user = await getAuthUser();

		// verify if user is vendor
		const userDb = await db.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				role: true,
			},
		});

		if (userDb?.role !== "VENDOR") {
			throw new Error("Unauthorized");
		}
		const queryCondition = query ? `%${query}%` : "%";

		// 	const totalRentalRaw = await db.$queryRaw<{ count: string }[]>`
		// 	SELECT COUNT(*) as count
		// 	FROM Property p
		// 	WHERE p.userId = ${user.id} AND p.name LIKE ${queryCondition};
		// `;
		// 	console.log("totalRental: ", totalRentalRaw);

		// 	const totalRental = Number(totalRentalRaw[0].count);
		const totalRental = await db.property.count({
			where: {
				userId: user.id,
				name: {
					contains: query || undefined,
				},
			},
		});

		//	console.log("totalRental", totalRental);
		const totalPage = Math.ceil(totalRental / pageSpan);
		console.log("total page:", totalPage);
		const orderByClause = `${
			orderByPrice?.toLowerCase() === "desc"
				? `p.price DESC`
				: orderByPrice?.toLowerCase() === "asc"
				? `p.price ASC`
				: orderByName?.toLowerCase() === "desc"
				? `p.name DESC`
				: orderByName?.toLowerCase() === "asc"
				? `p.name ASC`
				: `p."createdAt" DESC`
		}`;
		// fetch the property belongs to the vendor , using raw query for better performance

		const rentalsAggregate = await db.$queryRaw<
			{
				id: string;
				name: string;
				address: string;
				price: number;
				totalNightSum: number;
				orderTotalSum: number;
			}[]
		>`
		SELECT
				p.id,
				p.name,
				p.price,
				p.address,
				COALESCE(SUM(o."totalNight"), 0) AS "totalNightSum",
				COALESCE(SUM(o."orderTotal"), 0) AS "orderTotalSum"
			FROM
			"Property" p
			LEFT JOIN
			"Order" o ON p.id = o."propertyId" AND o."paymentStatus" = true
			WHERE
				p."userId" = ${user.id}  AND p."name" LIKE ${queryCondition}
			GROUP BY
				p."id", p."name", p."price", p."address"
			ORDER BY ${Prisma.raw(orderByClause)}
			LIMIT ${pageSpan}
			OFFSET ${offset};
			`;

		console.log("rental Agge:", rentalsAggregate);

		//	await new Promise(resolve => setTimeout(resolve, 2000));

		// Convert Decimal objects to plain JavaScript numbers
		const results = rentalsAggregate.map(item => ({
			...item,
			price: Number(item.price),
			totalNightSum: Number(item.totalNightSum),
			orderTotalSum: Number(item.orderTotalSum),
		}));
		return {
			results,
			page: currentPage,
			totalPage,
			totalRental,
		};
	} catch (error) {
		console.log(error);
		return { results: [], page: currentPage, totalPage: 0, totalRental: 0 };
	}
};

export const deleteRentalAction = async (
	prevState: unknown,
	{ id, searchParams }: { id: string; searchParams: URLSearchParams }
) => {
	let message = "";

	try {
		const user = await getAuthUser();
		// check if the property belongs to the user
		const existsRental = await db.property.findFirst({
			where: {
				userId: user.id,
				id,
			},
			select: {
				id: true,
			},
		});
		if (existsRental) {
			await db.property.delete({
				where: {
					id,
					userId: user.id,
				},
			});
			message = "Deleted!";
		}
	} catch (error) {
		console.log(error);
		message = "failed";
		return { message };
	}
	revalidatePath(`/rentals?${searchParams.toString()}`);
	return { message };
};

export const updateRental = async (
	propertyId: string,
	prev: unknown,
	formData: FormData
) => {
	let validatedPropertyId = "";
	try {
		const rawData = Object.fromEntries(formData);
		const user = await getAuthUser();
		await getVendorUser(user.id);

		// validate propertyId
		validatedPropertyId = validateZodSchema(PropertyIdSchema, propertyId);

		const validatedFields = validateZodSchema(CreatePropertySchema, rawData);
		//	console.log(rawData);
		//	console.log(validatedFields);

		const amenitiesArray = validatedFields.amenities
			.split(",")
			.map(name => name.trim());

		// get amenities from DB to make sure ID provided from front-end is valid
		const amenities = await db.amenities.findMany({
			where: {
				id: {
					in: amenitiesArray,
				},
			},
		});

		const {
			name,
			address,
			tagline,
			price,
			categoryId,
			description,
			country,
			guests,
			bedrooms,
			baths,
			latLng,
		} = validatedFields;
		//update the property
		await db.property.update({
			where: {
				id: validatedPropertyId,
			},
			data: {
				name,
				address,
				tagline,
				price,
				categoryId,
				description,
				country,
				guests,
				bedrooms,
				baths,
				latLng,
			},
		});
		// delete the old relation at amenity_property joint table
		await db.propertyAmenities.deleteMany({
			where: {
				propertyId: validatedPropertyId,
			},
		});

		// create new relation at joint table
		await db.propertyAmenities.createMany({
			data: amenities.map(ame => {
				return { propertyId: validatedPropertyId, amenitiesId: ame.id };
			}),
		});
	} catch (error) {
		console.log(error);
		return renderError(error);
	}

	redirect(`/properties/${validatedPropertyId}`);
};

export const addRentalImg = async (
	formData: FormData,
	pathName: string,
	rentalId: string
) => {
	try {
		const image = formData.get("image");
		if (!rentalId) {
			throw new Error("rentalId is required!");
		}

		const validatedImage = validateZodSchema(ImageSchema, { image });
		// upload image to cloudinary
		const imageUrl = await cloudinaryUpload(validatedImage.image);
		// add the imageUrl to DB;
		await db.propertyImages.create({
			data: {
				propertyId: rentalId,
				imageUrl,
			},
		});
		revalidatePath(pathName);
		return { message: "Add the new image successfully!" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
};

export const deleteRentalImage = async (imageId: string, pathName: string) => {
	try {
		await db.propertyImages.delete({
			where: {
				id: imageId,
			},
		});
		revalidatePath(pathName);
		return { message: "Deleted!" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
};

export const updateRentalImage = async (
	imageId: string,
	pathName: string,
	formData: FormData,
	imageUrl: string
) => {
	try {
		const cloudinaryImageIdWithSuffix = imageUrl.split("/").pop();
		if (!cloudinaryImageIdWithSuffix) {
			throw new Error("wrong image url, please try again!");
		}
		const cloudinaryImageId = cloudinaryImageIdWithSuffix.split(".")[0];
		//	console.log(cloudinaryImageId);
		const image = formData.get("image");

		// validate the formData with zod
		const validatedImage = validateZodSchema(ImageSchema, { image });
		//upload the new image and return the url
		const updatedImageUrl = await cloudinaryUpload(validatedImage.image);
		// delete the old image at cloudinary by using the old image cloudinary ID from the oldImage url
		await cloudinaryDelete(cloudinaryImageId);
		// update the  imageUrl at DB by using the imageId
		await db.propertyImages.update({
			where: {
				id: imageId,
			},
			data: { imageUrl: updatedImageUrl },
		});
		revalidatePath(pathName);
		return { message: "Update the image successfully!" };
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
};
export 	type EarningsByMonth = 
{	month:string;
	totalEarning:number;
	timeStamp:number;
}



export const fetchLastSixMonthEarning = async()=>{
	try {
		const user = await getAuthUser();
		const today = new Date(new Date().setHours(0,0,0,0));
		const sixMonthsAgo = new Date();
		sixMonthsAgo.setMonth(sixMonthsAgo.getMonth()-6);

		const earnings = await db.order.groupBy({
			by:['checkIn'],
		_sum:{
			orderTotal:true,
		},
		where:{
			property:{
				userId:user.id
			},
			checkIn:{
				gte:sixMonthsAgo,
				lt: today,
			},
			paymentStatus:true
		},
		orderBy:{
			checkIn:'asc'
		}
		})
		console.log(earnings);


 // Format the earnings data by month
 const earningsByMonth = earnings.reduce((acc: EarningsByMonth[], curr) => {
	const date = new Date(curr.checkIn);
	const month = formatDate({date,withoutDay:true}) 
	const existingEntry = acc.find(entry => entry.month === month);
	if(existingEntry){
		existingEntry.totalEarning += curr._sum.orderTotal || 0;
	}else{
		acc.push({
			month,
			totalEarning: curr._sum.orderTotal || 0,
			timeStamp: date.getTime(),
		})
	}
	return acc;
}, [] as EarningsByMonth[]);

console.log(earningsByMonth);
return earningsByMonth;
	} catch (	error) {
		console.log(error);
		return []
	}
}