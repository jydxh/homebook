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
import { City, ICity, State, IState, Country } from "country-state-city";

import { FixedSizeList as List } from "react-window";
import { Input } from "../ui/input";

function ProfileCountryCity({
	country = "USA",
	city = "Chicago-IL",
	state = "IL",
}: {
	country?: string;
	city?: string;
	state?: string;
}) {
	const [selectCountry, setSelectedCountry] = useState<string>(country);
	//const cities = City.getCitiesOfCountry(country);
	const states = State.getStatesOfCountry(country);
	const [stateLists, setStateLists] = useState<IState[] | undefined>(states);
	const [selectedState, setSelectedState] = useState(state);
	const [cityLists, setCityLists] = useState<ICity[] | undefined>();
	const [selectCity, setSelectCity] = useState(city);
	const [isInitial, setIsInitial] = useState(true);
	const listRef = useRef<List<unknown>>(null);

	/* update the state list when country changed */
	useEffect(() => {
		if (selectCountry) {
			const updateStates = State.getStatesOfCountry(selectCountry);
			setStateLists(updateStates);
			if (!isInitial) {
				setSelectedState("");
			}
		}
		setIsInitial(false);
	}, [selectCountry, isInitial]);

	/* update the city list when the country changed */
	useEffect(() => {
		if (selectCountry && selectedState) {
			const fetchedCities = City.getCitiesOfState(selectCountry, selectedState);
			setCityLists(fetchedCities);
			if (!isInitial) {
				setSelectCity("");
			}
		}
		setIsInitial(false);
	}, [selectCountry, selectedState, isInitial]);

	/* useEffect for to move the list to the selected item */
	useLayoutEffect(() => {
		if (listRef.current && selectCity && cityLists && cityLists.length > 0) {
			const index = cityLists.findIndex(
				city => `${city.name}-${city.stateCode}` === selectCity
			);

			if (index !== -1) {
				requestAnimationFrame(() => {
					listRef.current?.scrollToItem(index, "center");
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
					value={`${cityLists[index].name}`}>
					{`${cityLists[index].name}`}
				</SelectItem>
			</div>
		) : (
			"unavailable"
		);

	return (
		<>
			<div className="mb-2">
				<Label className="mb-2 block text-base">Country</Label>
				<Select
					required
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
						{Country.getAllCountries().map(country => {
							return (
								<SelectItem key={country.isoCode} value={country.isoCode}>
									{country.name}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>

			<div className="mb-2">
				<Label className="mb-2 block text-base">State/Province</Label>
				<Select
					required
					name="state"
					value={selectedState}
					defaultValue={state}
					onValueChange={value => {
						setSelectedState(value);
					}}>
					<SelectTrigger>
						<SelectValue placeholder="Select a State/Province" />
					</SelectTrigger>
					<SelectContent>
						{stateLists &&
							stateLists.map(item => {
								return (
									<SelectItem key={item.isoCode} value={item.isoCode}>
										{item.name}
									</SelectItem>
								);
							})}
					</SelectContent>
				</Select>
			</div>

			<div className="mb-2">
				<Label className="mb-2 block text-base">City</Label>
				<Select
					required
					disabled={!selectedState || !selectCountry}
					value={selectCity}
					defaultValue={city}
					onValueChange={value => {
						setSelectCity(value);
					}}>
					<SelectTrigger>
						<SelectValue placeholder="Select a City">{selectCity}</SelectValue>
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
			</div>
			{/* since the cityList will be small chunks, there is no way select tag get the selected options, so use this hidden input to store the city value*/}
			<Input type="hidden" name="city" value={selectCity} required />
		</>
	);
}
export default ProfileCountryCity;
