import { Label } from "../ui/label";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { countryList } from "@/utils/country";
import Image from "next/image";

function CountrySelect({ defaultValue = "CA" }: { defaultValue?: string }) {
	return (
		<div>
			<Label className="mb-2 block text-base" htmlFor="country">
				Country
			</Label>
			<Select name="country" defaultValue={defaultValue}>
				<SelectTrigger id="country">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{countryList.map(item => {
						const { name, code } = item;

						const flagUrl = `https://flagcdn.com/${code.toLowerCase()}.svg`;
						return (
							<SelectItem value={code} key={code}>
								<p className="flex gap-x-4 items-center justify-center">
									<Image
										src={flagUrl}
										alt={name}
										width={50}
										height={30}
										className="w-[25px] h-[15px]"
									/>{" "}
									{name}
								</p>
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
}
export default CountrySelect;
