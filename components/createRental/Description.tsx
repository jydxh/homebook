import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Description() {
	return (
		<div className="my-4">
			<Label className="mb-2 block text-base" htmlFor="description">
				Description
			</Label>
			<Textarea
				rows={4}
				id="description"
				name="description"
				placeholder="Description of your Property"
			/>
		</div>
	);
}
export default Description;
