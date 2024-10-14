import { categories } from "@/utils/categories";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Link from "next/link";
function HomeCategoryList() {
	return (
		<section className="my-4 mx-auto">
			<ScrollArea className="p-8 max-w-[1200px] py-6 mx-auto">
				<div className="flex gap-x-8 justify-center items-center whitespace-nowrap rounded-md ">
					{categories.map(cat => {
						return (
							<Link
								href="/"
								className="flex gap-2 justify-center items-center flex-shrink-0 flex-col"
								key={cat.id}>
								<p className="font-normal">{cat.label}</p>
								<cat.icon className="w-8 h-8 text-muted-foreground" />
							</Link>
						);
					})}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</section>
	);
}
export default HomeCategoryList;
