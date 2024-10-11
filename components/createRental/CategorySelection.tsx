import { Label } from "../ui/label";

import { categories } from "@/utils/categories";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function CategorySelection() {
	return (
		<div className="mb-2">
			<Label className="mb-2 block text-base" htmlFor="category">
				Category
			</Label>
			<Select name="category">
				<SelectTrigger id="category">
					<SelectValue
						placeholder="Please chooses one category in the list"
						defaultValue={categories[0].label}
					/>
				</SelectTrigger>
				<SelectContent>
					{categories.map(item => {
						const { label, icon: Icon } = item;
						return (
							<SelectItem value={label} key={label}>
								<p className="flex gap-x-4 items-center justify-center">
									<Icon /> {label}
								</p>
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
}
export default CategorySelection;
