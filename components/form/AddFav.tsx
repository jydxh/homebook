"use client";

import FormContainer from "./FormContainer";
import { addFavAction } from "@/utils/actions/PropertyActions";
import { usePathname } from "next/navigation";
import { AddFavButton } from "./Buttons";

function AddFav({ isFav, propertyId }: { isFav: boolean; propertyId: string }) {
	const path = usePathname();

	const addFav = addFavAction.bind(null, {}, { path, propertyId }); // null for "this", the {} empty object for prevState, {path, propertyId} for the second argue

	return (
		<FormContainer action={addFav}>
			<AddFavButton isFav={isFav} />
		</FormContainer>
	);
}
export default AddFav;
