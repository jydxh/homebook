import HomeAmenityList from "@/components/home/HomeAmenityList";
import HomeCategoryList from "@/components/home/HomeCategoryList";
import HomeSearch from "@/components/home/HomeSearch";
import { Separator } from "@/components/ui/separator";
import HomePropertyList from "@/components/home/HomePropertyList";
import HomeSort from "@/components/home/HomeSort";
import { Suspense } from "react";
import PropertyListFallBack from "@/components/fallback/PropertyListFallBack";
export type HomePageSearchParam = {
	category?: string;
	amenities?: string;
	search?: string;
	page?: string;
	price?: string;
	rating?: string;
};

export default async function HomePage({
	searchParams,
}: {
	searchParams: HomePageSearchParam;
}) {
	return (
		<section>
			{/* home search */}
			<HomeSearch />
			{/* home sort */}
			<HomeSort />
			{/* home category selection */}
			<HomeCategoryList />
			{/* home amenity selection */}
			<HomeAmenityList />

			<Separator />

			{/* list of property */}
			<Suspense fallback={<PropertyListFallBack />}>
				<HomePropertyList searchParams={searchParams} />
			</Suspense>
		</section>
	);
}
