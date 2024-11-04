"use client";
import {
	useEffect,
	useState,
	CSSProperties,
	useRef,
	useLayoutEffect,
} from "react";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { countryList } from "@/utils/country";
import { City, ICity } from "country-state-city";
import { Skeleton } from "../ui/skeleton";
import { FixedSizeList as List } from "react-window";

function ProfileCountryCity({
	country = "USA",
	city = "Chicago-IL",
}: {
	country?: string;
	city?: string;
}) {
	const [selectCountry, setSelectedCountry] = useState<string>(country);
	//const cities = City.getCitiesOfCountry(country);
	const [cityLists, setCityLists] = useState<ICity[] | undefined>();
	const [selectCity, setSelectCity] = useState(city);
	const [loading, setLoading] = useState(false);
	const [isInitial, setIsInitial] = useState(true);
	const listRef = useRef<any>(null);

	/* update the city list when the country changed */
	useEffect(() => {
		const fetchCites = async () => {
			setLoading(true);
			const fetchedCities = City.getCitiesOfCountry(selectCountry);
			setCityLists(fetchedCities);
			setLoading(false);
		};

		if (selectCountry) {
			fetchCites();
			if (!isInitial) {
				setSelectCity("");
			}
		}
		setIsInitial(false);
	}, [selectCountry]);

	/* useEffect for to move the list to the selected item */
	useLayoutEffect(() => {
		if (listRef.current && selectCity && cityLists && cityLists.length > 0) {
			const index = cityLists.findIndex(
				city => `${city.name}-${city.stateCode}` === selectCity
			);

			if (index !== -1) {
				requestAnimationFrame(() => {
					listRef.current.scrollToItem(index, "center");
				});
			}
		}
	}, [selectCity, cityLists]);

	/*  use the react-window to render thousands of city at dom, to improve performance */
	const Row = ({ index, style }: { index: number; style: CSSProperties }) =>
		cityLists ? (
			<div style={style}>
				<SelectItem
					key={`${cityLists[index].name}-${cityLists[index].stateCode}`}
					value={`${cityLists[index].name}-${cityLists[index].stateCode}`}>
					{`${cityLists[index].name}-${cityLists[index].stateCode}`}
				</SelectItem>
			</div>
		) : (
			"unavailable"
		);

	return (
		<>
			<div className="mb-2">
				<Label className="mb-2 block text-base" htmlFor="country">
					Country
				</Label>
				<Select
					name="country"
					value={selectCountry}
					defaultValue={country}
					onValueChange={value => {
						setSelectedCountry(value);
					}}>
					<SelectTrigger>
						<SelectValue placeholder="Select a Country">
							{countryList.find(item => item.code === selectCountry)?.name}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{countryList.map(country => {
							return (
								<SelectItem key={country.code} value={country.code}>
									{country.name}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>

			<div className="mb-2">
				<Label className="mb-2 block text-base" htmlFor="city">
					City
				</Label>
				{loading ? (
					<Skeleton />
				) : (
					<Select
						name="city"
						value={selectCity}
						defaultValue={city}
						onValueChange={value => {
							setSelectCity(value);
						}}>
						<SelectTrigger>
							<SelectValue placeholder="Select a City">
								{selectCity}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<List
								ref={listRef}
								height={300}
								itemCount={cityLists?.length || 0}
								itemSize={35}
								width="100%">
								{Row}
							</List>
						</SelectContent>
					</Select>
				)}
			</div>
		</>
	);
}
export default ProfileCountryCity;
