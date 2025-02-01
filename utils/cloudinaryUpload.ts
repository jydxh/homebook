import { v2 as cloudinary } from "cloudinary";

export default async function cloudinaryUpload(file: File): Promise<string> {
	cloudinary.config({
		cloud_name: "dudordakm",
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_SECRET, // Click 'View API Keys' above to copy your API secret
	});
	try {
		const fileBuffer = await file.arrayBuffer();

		const based64String = Buffer.from(fileBuffer).toString("base64");

		const uploadResult = await cloudinary.uploader.upload(
			`data:${file.type};base64,${based64String}`,
			{
				use_filename: false,
				folder: "Airbnb",
			}
		);
		console.log(uploadResult.public_id);
		return uploadResult.secure_url;
	} catch (error) {
		console.log(error);
		throw new Error("Cloudinary config error");
	}
}

export async function cloudinaryDelete(public_id: string) {
	cloudinary.config({
		cloud_name: "dudordakm",
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_SECRET, // Click 'View API Keys' above to copy your API secret
	});
	try {
		const result = await cloudinary.uploader.destroy(public_id);
		console.log("result from cloud delete:", result);
		return { result: "deleted" };
	} catch (error) {
		console.log(error);
		throw new Error("failed to delete");
	}
}
