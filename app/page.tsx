import HomeAmenityList from "@/components/home/HomeAmenityList";
import HomeCategoryList from "@/components/home/HomeCategoryList";
import HomeSearch from "@/components/home/HomeSearch";
import { Separator } from "@/components/ui/separator";
import HomePropertyList from "@/components/home/HomePropertyList";

export type HomePageSearchParam = {
	category?: string;
	amenities?: string;
	search?: string;
	page?: string;
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
			{/* home category selection */}
			<HomeCategoryList />
			{/* home amenity selection */}
			<HomeAmenityList />

			<Separator />

			{/* list of property */}
			<HomePropertyList searchParams={searchParams} />
		</section>
	);
}
