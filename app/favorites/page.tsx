export const dynamic = "force-dynamic"; // Ensure the page is not statically generated

import { Separator } from "@/components/ui/separator";

import PropertyListFallBack from "@/components/fallback/PropertyListFallBack";
import { Suspense } from "react";
import FavoriteList from "@/components/favorite/FavoriteList";

async function FavoritesPage() {
	return (
		<>
			<h2 className="w-full mx-auto mt-8 text-center font-semibold text-xl">
				My Favorite property Lists
			</h2>
			<Separator className="mt-8" />
			<Suspense fallback={<PropertyListFallBack />}>
				<FavoriteList />
			</Suspense>
		</>
	);
}
export default FavoritesPage;
