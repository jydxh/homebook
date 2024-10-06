import FormContainer from "../form/FormContainer";
import { Button } from "../ui/button";
import {
	cancelApplicationAction,
	fetchVendorProfileId,
} from "@/utils/actions/ProfileActions";

async function CancelApplication() {
	const vendorProfile = await fetchVendorProfileId();
	if (!vendorProfile) return null;
	const cancelApplication = cancelApplicationAction.bind(
		null,
		vendorProfile.id
	);
	return (
		<FormContainer action={cancelApplication}>
			<Button
				className="hover:bg-destructive hover:text-white"
				variant="outline">
				Cancel Application
			</Button>
		</FormContainer>
	);
}
export default CancelApplication;
