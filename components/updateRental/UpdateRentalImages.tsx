import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { Button } from "../ui/button";
import { FaPlusCircle } from "react-icons/fa";

function UpdateRentalImages({ images }: { images: { imageUrl: string }[] }) {
	const imagesArr = images.map(img => img.imageUrl);
	console.log(imagesArr);
	return (
		<>
			<Label className="mb-2 block text-base">Update Rental Images</Label>
			<ScrollArea className="w-full whitespace-nowrap rounded-md border">
				<div className="flex w-max space-x-4 p-4 items-center">
					{imagesArr.map(url => {
						return (
							<div
								key={url}
								className="w-[120px] h-[120px] relative group hover:scale-110 duration-150">
								<div className="z-50 absolute inset-0 bg-gray-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center space-x-2">
									<Button size={"icon"} variant={"ghost"}>
										<TiEdit className="w-[1.6rem] h-[1.6rem]" />
									</Button>
									<Button size={"icon"} variant={"ghost"}>
										<MdDeleteForever className="w-[1.6rem] h-[1.6rem]" />
									</Button>
								</div>
								<Image
									fill
									src={url}
									alt="rentalImages"
									className="object-cover rounded"
								/>
							</div>
						);
					})}
					<Button
						size={"icon"}
						variant={"outline"}
						className="hover:scale-110 duration-150">
						<FaPlusCircle className="w-4 h-4" />
					</Button>
				</div>
			</ScrollArea>
		</>
	);
}
export default UpdateRentalImages;
