"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationLink,
	PaginationPrevious,
} from "@/components/ui/pagination";
import generatePageArray from "@/utils/generatePageArray";
import { useSearchParams, useRouter } from "next/navigation";

type paginationPropsType = {
	href?: string;
	totalPage: number;
	currentPage: string | number;
	totalCount: number;
};

function HomePagination({ totalPage, currentPage, href }: paginationPropsType) {
	const pageSpan = 10;
	const searchParams = useSearchParams();
	const router = useRouter();
	const params = new URLSearchParams(searchParams);

	const pageArray = generatePageArray({
		currentPage: Number(currentPage),
		totalPage,
		pageSpan,
	});
	const urlPage = params.get("page");

	const handlePrevPage = () => {
		const prevPage = Number(currentPage) - 1;
		params.set("page", prevPage.toString());
		router.push(`/${href ?? ""}?${params.toString()}`);
	};
	const handleNextPage = () => {
		const prevPage = Number(currentPage) + 1;
		params.set("page", prevPage.toString());
		router.push(`/${href ?? ""}?${params.toString()}`);
	};

	return (
		<Pagination className="mx-auto">
			<PaginationContent>
				{Number(currentPage) > 1 && (
					<PaginationItem>
						<PaginationPrevious onClick={handlePrevPage} className="px-2" />
					</PaginationItem>
				)}

				{totalPage > 0 &&
					pageArray.map(page => {
						params.set("page", page.toString());
						return (
							<PaginationItem key={page}>
								<PaginationLink
									href={`/${href ?? ""}?${params.toString()}`}
									isActive={page === Number(urlPage)}>
									{page}
								</PaginationLink>
							</PaginationItem>
						);
					})}

				{Number(currentPage) < totalPage && (
					<PaginationItem>
						<PaginationNext onClick={handleNextPage} className="px-2" />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
export default HomePagination;
