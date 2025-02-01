"use client";
import { Label } from "../ui/label";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Image from "next/image";
import AddMoreImgBtn from "./AddMoreBtn";
import UpdateSingleImage from "./UpdateSingleImage";
import DeleteImageBtn from "./DeleteImageBtn";

function UpdateRentalImages({
	images,
	propertyId,
}: {
	images: { imageUrl: string; id: string }[];
	propertyId: string;
}) {
	return (
		<>
			<Label className="mb-2 block text-base">Update Rental Images</Label>
			<ScrollArea className="w-full whitespace-nowrap rounded-md border">
				<div className="flex w-max space-x-4 p-4 items-center">
					{images.map(({ imageUrl, id }) => {
						return (
							<div
								key={imageUrl}
								className="w-[120px] h-[120px] relative group hover:scale-110 duration-150">
								<div className="z-50 absolute inset-0 bg-gray-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center space-x-2">
									<UpdateSingleImage imageId={id} />
									<DeleteImageBtn imageId={id} />
								</div>
								<Image
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									src={imageUrl}
									alt="rentalImages"
									className="object-cover rounded"
								/>
							</div>
						);
					})}
					<AddMoreImgBtn rentalId={propertyId} />
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</>
	);
}
export default UpdateRentalImages;
