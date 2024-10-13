"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Image from "next/image";

function UploadPropertyImage() {
	const [error, setError] = useState<string | null>(null);
	const [previews, setPreviews] = useState<string[]>([]);
	const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const files = evt.target.files;
		if (!files) return;
		setError(null);
		if (files.length > 10) {
			setError("please provide no more than 10 images!");
			return;
		}

		let newPreviews: string[] = [];

		for (const file of Array.from(files)) {
			if (file.size >= 1024 * 1024) {
				setError(
					"Each image can only be less than 1MB, please provide correct size of image"
				);
				return;
			}
			const imgURL = URL.createObjectURL(file);
			newPreviews = [...newPreviews, imgURL];
		}
		// Revoke previous URLs
		previews.forEach(url => URL.revokeObjectURL(url));
		setPreviews(newPreviews);
	};

	// Clean up URLs when component unmounts
	useEffect(() => {
		return () => {
			previews.forEach(url => URL.revokeObjectURL(url));
		};
	}, [previews]);
	return (
		<div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
			<div>
				<Label className="mb-2 block text-base" htmlFor="image">
					Upload Rental Images
				</Label>
				<Input
					placeholder="maxsize: 1MB, max quantity: 10"
					type="file"
					multiple
					accept="image/*"
					name="images"
					onChange={handleFileChange}
				/>
				<span
					className={`text-sm text-red-500 font-medium ${
						error ? "inline" : "hidden"
					}`}>{`* ${error}`}</span>
			</div>
			{/* rendering the preview of images */}
			<ScrollArea
				className={`${
					previews.length > 0 ? "block" : "hidden"
				} w-full whitespace-nowrap rounded-md border`}>
				<div className="flex w-max space-x-4 p-4">
					{previews.map(prev => {
						return (
							<div className="w-[100px] h-[100px] relative" key={prev}>
								<Image
									fill
									className="object-cover"
									src={prev}
									alt="upload images"
								/>
							</div>
						);
					})}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
export default UploadPropertyImage;
