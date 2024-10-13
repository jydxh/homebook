/**
 * Creates a debounced function that delays invoking the provided function until after the specified delay.
 *
 * @template T - The type of the function to debounce.
 * @param {T} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {(...args: Parameters<T>) => void} - A new debounced function.
 */
export function debounce<T extends (...arg: unknown[]) => void>(
	func: T,
	delay: number
) {
	let timer: NodeJS.Timeout;
	return function (...args: Parameters<T>) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => func(...args), delay);
	};
}
