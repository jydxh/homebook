import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";

export const LoadingButton = () => {
	return (
		<Button>
			<CgSpinner className="animate-spin" />
		</Button>
	);
};
