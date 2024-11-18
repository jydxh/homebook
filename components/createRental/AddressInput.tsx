"use client"; // Ensures the component is rendered on the client side
import { Input } from "../ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import { debounce } from "@/utils/debounce";

type LatLng = google.maps.LatLng;
// Define libraries to include the Places API
const libs: Library[] = ["places", "core", "maps", "marker"];

const initialLocation = { lat: 43.4643, lng: -80.5204 };

export default function AddressInput({
	defaultAddress,
	defaultLatLng,
	mode = "create",
}: {
	defaultAddress?: string;
	defaultLatLng?: LatLng;
	mode?: "create" | "update";
}) {
	/* map state */
	const [map, setMap] = useState<google.maps.Map | null>(null);
	/* autoCompleteInput state */
	const [autoComplete, setAutoComplete] =
		useState<google.maps.places.Autocomplete | null>(null);
	// Ref for the map container
	const mapRef = useRef<HTMLDivElement>(null);
	// autoCompleteRef for the input element
	const placeAutoCompleteRef = useRef<HTMLInputElement>(null); // Ref for the autoComplete element
	// Load Google Maps script with API key and libraries
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Use your API key from environment variables
		libraries: libs,
	});

	const [selectedPlace, setSelectedPlace] = useState<string | null>(
		defaultAddress || null
	);
	const [latLng, setLatLng] = useState<LatLng | null>(defaultLatLng || null);
	const [marker, setMarker] =
		useState<google.maps.marker.AdvancedMarkerElement | null>(null);

	const drawMarkerCallback = useCallback(
		(position: LatLng | { lat: number; lng: number }) => {
			if (!map) return;
			map.setCenter(position);
			/* if it has marker, just overwrite the marker's position, otherwise, create a new marker */
			if (marker) {
				marker.position = position;
			} else {
				const marker = new google.maps.marker.AdvancedMarkerElement({
					map,
					position,
					title: "Marker",
				});
				setMarker(marker);
			}
		},
		[map, marker]
	);

	// Initialize Autocomplete and map when component mounts
	useEffect(() => {
		if (isLoaded) {
			const mapOptions = {
				center: defaultLatLng || initialLocation,
				zoom: 12,
				mapId: "my-map-id",
			};

			// setup the map
			const gMap = new google.maps.Map(
				mapRef.current as HTMLDivElement,
				mapOptions
			);

			//set up the initial marker only when at update property page
			if (mode === "update") {
				const initialMarker = new google.maps.marker.AdvancedMarkerElement({
					map: gMap,
					position: defaultLatLng || initialLocation,
					title: "initialMarker",
				});
				setMarker(initialMarker);
			}

			// limit place bounce for ontario

			/* const ontarioBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng({ lat: 41.6764, lng: -95.4565 }),
				new google.maps.LatLng({ lat: 56.85, lng: -74.6682 })
			); */

			//set autocomplete
			/* delete the bounds and restrictions since this app will be globally properties available */
			const gAutoComplete = new google.maps.places.Autocomplete(
				placeAutoCompleteRef.current as HTMLInputElement,
				{
					//bounds: ontarioBounds,
					//componentRestrictions: { country: "CA" },
					fields: ["formatted_address", "geometry", "name"],
					types: ["address"],
				}
			);

			setAutoComplete(gAutoComplete);
			setMap(gMap);
			//drawMarkerCallback(defaultLatLng || initialLocation);
		}
	}, [isLoaded, defaultLatLng, mode]);

	useEffect(() => {
		if (autoComplete) {
			/* add debounce for this evt */
			const handlePlaceChanged = debounce(() => {
				const place = autoComplete.getPlace();
				//console.log("place:", place);
				setSelectedPlace(place.formatted_address as string);
				/* add the latlng to state */
				setLatLng(place.geometry?.location as LatLng);
				const position = place.geometry?.location as LatLng;
				if (position) {
					// place a marker on the map
					drawMarkerCallback(position);
				}
			}, 500);

			autoComplete.addListener(
				"place_changed",
				handlePlaceChanged
				/* 	 () => {
				const place = autoComplete.getPlace();
				console.log("place:", place);
				setSelectedPlace(place.formatted_address as string);
				// add the latlng to state 
				setLatLng(place.geometry?.location as LatLng);
				const position = place.geometry?.location as LatLng;
				if (position) {
					// place a marker on the map
					setMarker(position);
				}
			} */
			);
			return () => {
				if (marker) setMarker(null);
			};
		}
	}, [autoComplete, drawMarkerCallback, marker]);

	if (loadError) return <p>Error loading Google Maps</p>;
	if (!isLoaded) return <p>Loading...</p>;

	return (
		<div className="mb-4 flex flex-col space-y-4 justify-center">
			<h2 className="font-medium">Address</h2>
			<div className="grid sm:grid-cols-2 gap-4">
				<Input
					defaultValue={defaultAddress}
					ref={placeAutoCompleteRef}
					required
					onKeyDown={evt => {
						if (evt.key === "Enter") evt.preventDefault();
					}}
				/>
				<Input
					defaultValue={defaultAddress}
					required
					type="hidden"
					readOnly
					name="address"
					value={selectedPlace || ""}
				/>
			</div>

			<Input
				required
				type="hidden"
				name="latLng"
				value={JSON.stringify(latLng)}
			/>
			{/* the entry point of google map */}
			<div className=" h-[600px] w-full" ref={mapRef}></div>
		</div>
	);
}
