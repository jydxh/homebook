import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormInput({
	label,
	type,
	name,
}: {
	label: string;
	type: string;
	name: string;
}) {
	return (
		<div className="mb-2">
			<Label className="mb-2">{label}</Label>
			<Input type={type} name={name} />
		</div>
	);
}
export default FormInput;
