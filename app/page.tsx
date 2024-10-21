import HomeAmenityList from "@/components/home/HomeAmenityList";
import HomeCategoryList from "@/components/home/HomeCategoryList";
import HomeSearch from "@/components/home/HomeSearch";
import { Separator } from "@/components/ui/separator";
import HomePropertyList from "@/components/home/HomePropertyList";
import { getVendorUser } from "@/utils/actions/PropertyActions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
	const user = await currentUser();
	const isVendor = await getVendorUser(user?.id || "");
	if (!isVendor) {
		return redirect("/");
	}

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
