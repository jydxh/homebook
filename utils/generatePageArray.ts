function generatePageArray({
	totalPage,
	currentPage,
	pageSpan = 10,
}: {
	totalPage: number;
	currentPage: number;
	pageSpan?: number;
}) {
	const startIndex = Math.floor(currentPage / pageSpan) * pageSpan;
	const lastGroupPageIndex = Math.floor(totalPage / pageSpan) * pageSpan;
	if (totalPage === 0) return [];
	if (totalPage <= pageSpan) {
		return Array.from({ length: totalPage }, (_, i) => i + 1);
	} else {
		if (currentPage <= pageSpan) {
			/* 1-10 */
			return Array.from({ length: pageSpan }, (_, i) => i + 1);
		} else if (currentPage > pageSpan && currentPage <= lastGroupPageIndex) {
			/* 11 ~ 50 */
			if (currentPage % pageSpan === 0) {
				/* when current page is like 20, 30 ,40 */
				return Array.from({ length: pageSpan }, (_, i) => currentPage - 9 + i);
			}
			return Array.from({ length: pageSpan }, (_, i) => i + startIndex + 1);
		} else {
			/* when current page is at the last group of pages */
			return Array.from(
				{ length: totalPage - lastGroupPageIndex },
				(_, i) => i + lastGroupPageIndex + 1
			);
		}
	}
}
export default generatePageArray;
