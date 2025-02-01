import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import useImageValidation from "@/hooks/useImageValidation";
import { updateRentalImage } from "@/utils/actions/PropertyActions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { SubmitButton } from "../form/Buttons";

function UpdateSingleImage({
	imageId,
	imageUrl,
}: {
	imageId: string;
	imageUrl: string;
}) {
	const [open, setOpen] = useState(false);
	const [pending, setPending] = useState(false);
	const { toast } = useToast();
	const pathName = usePathname();
	const { validateImage } = useImageValidation();
	const handleUpdate = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget);
		const image = formData.get("image") as File | null;
		//console.log(image);

		if (validateImage(image)) {
			try {
				setPending(true);
				const result = await updateRentalImage(
					imageId,
					pathName,
					formData,
					imageUrl
				);
				toast({ description: result.message });
				setOpen(false);
				setPending(false);
			} catch (error) {
				console.log(error);
				return toast({
					description: "failed to upload image, please try again!",
				});
			}
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"icon"} variant={"ghost"}>
					<TiEdit className="w-[1.6rem] h-[1.6rem]" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={evt => handleUpdate(evt)}>
					<DialogHeader>
						<DialogTitle>Update Image</DialogTitle>
						<DialogDescription>
							Please pick up an image you want to replace. Max size 1Mb.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<Input required name="image" type="file" accept="image/*" />
					</div>
					<DialogFooter className="gap-y-2">
						<SubmitButton
							text="Update the Image"
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
}
export default UpdateSingleImage;
