import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormInput({
	label,
	type,
	name,
	required = true,
	defaultValue,
	accept,
}: {
	label: string;
	type: string;
	name: string;
	required?: boolean;
	defaultValue?: string;
	accept?: string;
}) {
	return (
		<div className="mb-2">
			<Label className="mb-2 block capitalize text-base" htmlFor={name}>
				{label}
			</Label>
			<Input
				accept={accept}
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
