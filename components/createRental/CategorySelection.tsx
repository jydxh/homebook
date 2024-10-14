import { Label } from "../ui/label";

import { categories } from "@/utils/categories";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function CategorySelection({ defaultValue = "10" }: { defaultValue?: string }) {
	return (
		<div className="mb-2">
			<Label className="mb-2 block text-base" htmlFor="category">
				Category
			</Label>
			<Select name="categoryId" defaultValue={defaultValue || categories[0].id}>
				<SelectTrigger id="categoryId">
					<SelectValue
						placeholder="Please chooses one category in the list"
						defaultValue={categories[0].id}
					/>
				</SelectTrigger>
				<SelectContent>
					{categories.map(item => {
						const { label, icon: Icon, id } = item;
						return (
							<SelectItem value={id} key={id}>
								<p className="flex gap-x-4 items-center justify-center">
									<Icon className="w-5 h-5" /> {label}
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
