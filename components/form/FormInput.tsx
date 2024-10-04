import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormInput({
	label,
	type,
	name,
	required = true,
	defaultValue,
}: {
	label: string;
	type: string;
	name: string;
	required?: boolean;
	defaultValue?: string;
}) {
	return (
		<div className="mb-2">
			<Label className="mb-2 block capitalize text-base" htmlFor={name}>
				{label}
			</Label>
			<Input
				type={type}
				id={name}
				name={name}
				required={required}
				defaultValue={defaultValue}
			/>
		</div>
	);
}
export default FormInput;
