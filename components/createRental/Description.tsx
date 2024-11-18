import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Description({ defaultValue }: { defaultValue?: string }) {
	return (
		<div className="mb-2">
			<Label className="mb-2 block text-base" htmlFor="description">
				Description
			</Label>
			<Textarea
				defaultValue={defaultValue}
				required
				minLength={20}
				maxLength={500}
				rows={4}
				id="description"
				name="description"
				placeholder="Description of your Property (20-500 characters)"
			/>
		</div>
	);
}
export default Description;
