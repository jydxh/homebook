import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Seed roles
	const adminRole = await prisma.role.create({
		data: { id: "role_1", name: "admin" },
	});

	const vendorRole = await prisma.role.create({
		data: { id: "role_2", name: "vendor" },
	});

	const userRole = await prisma.role.create({
		data: { id: "role_3", name: "user" },
	});

	// Seed users
	const adminUser = await prisma.user.create({
		data: {
			id: "user_2lA4qUAQVIOgPoX5IA7igNZaLFN",
			clerkId: "user_2lA4qUAQVIOgPoX5IA7igNZaLFN",
			firstName: "John",
			LastName: "Doe",
			userName: "adminJohn",
			email: "john.doe@admin.com",
			roleId: adminRole.id,
			createAt: new Date(),
		},
	});

	const vendorUser = await prisma.user.create({
		data: {
			id: "user_2lFWjdmDLIAMrUbQVchFWhuziCI",
			clerkId: "user_2lFWjdmDLIAMrUbQVchFWhuziCI",
			firstName: "Jane",
			LastName: "Smith",
			userName: "vendorJane",
			email: "jane.smith@vendor.com",
			roleId: vendorRole.id,
			createAt: new Date(),
			vendorProfile: {
				create: {
					businessName: "Jane’s Bakery",
					businessAddress: "123 Main St, Cityville",
					applicationStatus: true,
				},
			},
		},
	});

	const normalUser = await prisma.user.create({
		data: {
			id: "user_2lFVWw53aybMKR6ASpj6Ci7L1FU",
			clerkId: "user_2lFVWw53aybMKR6ASpj6Ci7L1FU",
			firstName: "Bob",
			LastName: "Johnson",
			userName: "userBob",
			email: "bob.johnson@gmail.com",
			roleId: userRole.id,
			createAt: new Date(),
		},
	});

	// Seed categories
	const category1 = await prisma.category.create({
		data: {
			id: "category_1",
			name: "Luxury",
		},
	});

	// Seed properties
	const property1 = await prisma.property.create({
		data: {
			id: "property_1",
			name: "Oceanfront Villa",
			tagline: "Experience luxury by the sea",
			categoryId: category1.id,
			image: "imageUrl",
			country: "USA",
			description: "A beautiful villa with ocean views",
			price: 500,
			guests: 6,
			bedrooms: 3,
			baths: 2,
			userId: vendorUser.clerkId,
		},
	});

	// Seed orders
	const order1 = await prisma.order.create({
		data: {
			id: "order_1",
			userId: normalUser.clerkId,
			propertyId: property1.id,
			orderTotal: 1500,
			totalNight: 3,
			checkIn: new Date("2024-10-10"),
			checkOut: new Date("2024-10-13"),
		},
	});

	// Seed reviews
	const review1 = await prisma.review.create({
		data: {
			id: "review_1",
			rating: 5,
			comment: "Amazing stay!",
			userId: normalUser.clerkId,
			propertyId: property1.id,
		},
	});
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
