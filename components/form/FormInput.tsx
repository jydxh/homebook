import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormInput({
	label,
	type,
	name,
	required = true,
	defaultValue,
	accept,
	placeholder,
	maxLength,
}: {
	label: string;
	type: string;
	name: string;
	required?: boolean;
	defaultValue?: string | number;
	accept?: string;
	placeholder?: string;
	maxLength?: number;
}) {
	return (
		<div className="mb-2">
			<Label className="mb-2 block text-base" htmlFor={name}>
				{label}
			</Label>
			<Input
				maxLength={maxLength}
				placeholder={placeholder}
				accept={accept}
				type={type}
				id={name}
				name={name}
				required={required}
				defaultValue={defaultValue}
				min={0}
			/>
		</div>
	);
}
export default FormInput;
