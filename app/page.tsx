import HomeAmenityList from "@/components/home/HomeAmenityList";
import HomeCategoryList from "@/components/home/HomeCategoryList";
import HomeSearch from "@/components/home/HomeSearch";
import { Separator } from "@/components/ui/separator";
import HomePropertyList from "@/components/home/HomePropertyList";

export default function HomePage() {
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
			<HomePropertyList />
		</section>
	);
}
