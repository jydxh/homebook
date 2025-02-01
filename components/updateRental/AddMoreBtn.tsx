import { useState } from "react";
import { addRentalImg } from "@/utils/actions/PropertyActions";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { FaPlusCircle } from "react-icons/fa";
import { SubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useToast } from "@/hooks/use-toast";

import useImageValidation from "@/hooks/useImageValidation";

const AddMoreImgBtn = ({ rentalId }: { rentalId: string }) => {
	const pathName = usePathname();
	const [pending, setPending] = useState(false);
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const { validateImage } = useImageValidation();
	const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget);
		const image = formData.get("image") as File | null;
		if (validateImage(image)) {
			// only if image pass the front end validation, will run the code below
			setPending(true);
			try {
				const result = await addRentalImg(formData, pathName, rentalId);
				toast({ description: result.message });
			} catch (error) {
				console.log(error);
				toast({ description: "There are some errors, please try again!" });
			}
			setPending(false);
			setOpen(false);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size={"icon"}
					variant={"outline"}
					className="hover:scale-110 duration-150">
					<FaPlusCircle className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={evt => handleSubmit(evt)}>
					<DialogHeader>
						<DialogTitle>Upload a new image</DialogTitle>
						<DialogDescription>
							Please choose a image to upload (file size must be less than 1Mb).
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<Input
							name="image"
							id="uploadImage"
							type="file"
							accept="image/*"
							className="col-span-3"
							required
						/>
					</div>
					<DialogFooter>
						<SubmitButton
							text="Add the Image"
							disabled={pending}
							spinning={pending}
						/>
						<DialogClose asChild>
							<Button variant={"outline"}>Cancel</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default AddMoreImgBtn;
