"use client";

import { categories } from "@/utils/categories";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
function HomeCategoryList() {
	const searchParams = useSearchParams();
	const categoryId = searchParams.get("category");
	const params = new URLSearchParams(searchParams);

	return (
		<section className="mt-4 mb-2 mx-auto">
			<ScrollArea className="p-8 max-w-[1200px] py-6 mx-auto">
				<div className="flex gap-x-8 justify-center items-center whitespace-nowrap rounded-md ">
					{categories.map(cat => {
						params.set("category", cat.id);
						const href = `/?${params.toString()}`;
						return (
							<Link href={href} key={cat.id}>
								<p
									className={`${
										categoryId === cat.id ? "text-primary " : ""
									}  hover:text-primary  font-medium flex gap-2 justify-center items-center flex-shrink-0 flex-col`}>
									{cat.label}
									<cat.icon
										className={`${
											categoryId === cat.id ? "text-primary " : ""
										} hover:text-primary   w-8 h-8 text-muted-foreground`}
									/>
								</p>
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
