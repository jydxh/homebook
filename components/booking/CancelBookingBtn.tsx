import { cancelOrder } from "@/utils/actions/PropertyActions";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
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
function CancelBookingBtn({ orderId }: { orderId: string }) {
	const cancelOrderAction = cancelOrder.bind(null, orderId);
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button>Cancel the Order</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will cancel the order, and the money you paid will return
							back to the payment card
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<FormContainer action={cancelOrderAction}>
							<SubmitButton text="Confirm" />
						</FormContainer>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
export default CancelBookingBtn;
