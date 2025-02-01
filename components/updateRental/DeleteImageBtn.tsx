import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { deleteRentalImage } from "@/utils/actions/PropertyActions";
import { DialogClose } from "@radix-ui/react-dialog";
import { SubmitButton } from "../form/Buttons";
// since the parent components is deleted from the dom, the child inside of the parent component all deleted, so no need to close the dialog in the handleDelete function
function DeleteImageBtn({ imageId }: { imageId: string }) {
	const { toast } = useToast();
	const pathName = usePathname();
	const [pending, setPending] = useState(false);
	const handleDelete = async (
		evt: React.FormEvent<HTMLFormElement>,
		imageId: string
	) => {
		evt.preventDefault();
		try {
			setPending(true);
			const result = await deleteRentalImage(imageId, pathName);
			toast({ description: result.message });
		} catch (error) {
			const err = error as Error;
			toast({ description: err.message });
		}
		setPending(false);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"icon"} variant={"ghost"}>
					<MdDeleteForever className="w-[1.6rem] h-[1.6rem]" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete the image
						from our server.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<form onSubmit={evt => handleDelete(evt, imageId)}>
						<SubmitButton
							text="Delete the Image"
							disabled={pending}
							spinning={pending}
						/>
					</form>

					<DialogClose>
						<Button variant={"secondary"}>Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
export default DeleteImageBtn;
