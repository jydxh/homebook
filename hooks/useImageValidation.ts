import { useToast } from "./use-toast";
import { imageTypes } from "@/utils/imageTypes";

function useImageValidation() {
	const { toast } = useToast();
	const validateImage = (image: File | null) => {
		if (!image || image.name === "" || image.size === 0) {
			toast({ description: "Image file is required!" });
			return false;
		}
		if (image.size > 1024 * 1024) {
			toast({ description: "Size of the Image must be less than 1MB!" });
			return false;
		}
		if (!imageTypes.includes(image.type)) {
			toast({
				description: "File must be an image in jpeg, png, gif, or webp format",
			});
			return false;
		}
		return true;
	};
	return { validateImage };
}
export default useImageValidation;
