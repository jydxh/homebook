import FormContainer from "../form/FormContainer";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteRentalAction } from "@/utils/actions/PropertyActions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function DeleteBtn({
	id,
	searchParams,
}: {
	id: string;
	searchParams: URLSearchParams;
}) {
	const deleteRental = deleteRentalAction.bind(null, {}, { id, searchParams });
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="outline" size={"icon"}>
						<RiDeleteBinLine className="w-4 h-4 hover:text-primary" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Warning</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							rental and remove the data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<FormContainer action={deleteRental}>
							<AlertDialogAction type="submit">Delete</AlertDialogAction>
						</FormContainer>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
export default DeleteBtn;
