"use client";
import { Label } from "../ui/label";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { deleteRentalImage } from "@/utils/actions/PropertyActions";

import { useToast } from "@/hooks/use-toast";

import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { Button } from "../ui/button";

import { usePathname } from "next/navigation";
import AddMoreImgBtn from "./AddMoreBtn";
import UpdateSingleImage from "./UpdateSingleImage";

function UpdateRentalImages({
	images,
}: {
	images: { imageUrl: string; id: string }[];
}) {
	const pathName = usePathname();
	const { toast } = useToast();
	const handleUpdate = (
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		imageId: string
	) => {
		evt.preventDefault();
		console.log("clicked update button");
		console.log(imageId);
	};
	const handleDelete = async (
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		imageId: string
	) => {
		evt.preventDefault();
		try {
			const result = await deleteRentalImage(imageId, pathName);
			toast({ description: result.message });
		} catch (error) {
			const err = error as Error;
			toast({ description: err.message });
		}
	};

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

									<Button
										size={"icon"}
										variant={"ghost"}
										onClick={evt => handleDelete(evt, id)}>
										<MdDeleteForever className="w-[1.6rem] h-[1.6rem]" />
									</Button>
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
					<AddMoreImgBtn />
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</>
	);
}
export default UpdateRentalImages;
