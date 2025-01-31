import FormContainer from "../form/FormContainer";
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

const AddMoreImgBtn = () => {
	const pathName = usePathname();

	const rentalId = pathName.split("/")[2];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={"icon"}
					variant={"outline"}
					className="hover:scale-110 duration-150">
					<FaPlusCircle className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<FormContainer action={addRentalImg}>
					<DialogHeader>
						<DialogTitle>Upload a new image</DialogTitle>
						<DialogDescription>
							Please choose a image from your local machine to upload.
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
						<input type="hidden" name="rentalId" value={rentalId} />
					</div>
					<DialogFooter>
						<SubmitButton text="Add the Image" />
					</DialogFooter>
				</FormContainer>
			</DialogContent>
		</Dialog>
	);
};
export default AddMoreImgBtn;
