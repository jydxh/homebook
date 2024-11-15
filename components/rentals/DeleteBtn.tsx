import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteRentalAction } from "@/utils/actions/PropertyActions";

function DeleteBtn({
	id,
	searchParams,
}: {
	id: string;
	searchParams: URLSearchParams;
}) {
	const deleteRental = deleteRentalAction.bind(null, {}, { id, searchParams });
	return (
		<FormContainer action={deleteRental}>
			<Button variant="outline" size={"icon"}>
				<RiDeleteBinLine className="w-4 h-4 hover:text-primary" />
			</Button>
		</FormContainer>
	);
}
export default DeleteBtn;
