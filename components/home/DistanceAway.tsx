"use client";

import { useEffect, useState } from "react";
import { calculateDistance } from "@/utils/calculateDistance";

function DistanceAway() {
	const [distance, setDistance] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const clientLat = position.coords.latitude;
					const clientLng = position.coords.longitude;
					const locationLat = 34.0522; // Replace with actual location latitude
					const locationLng = -118.2437; // Replace with actual location longitude
					const dist = calculateDistance(
						clientLat,
						clientLng,
						locationLat,
						locationLng
					);
					setDistance(dist);
				},
				err => {
					setError("Unable to retrieve your location");
					console.error(err);
				}
			);
		} else {
			setError("Geolocation is not supported by this browser");
		}
	}, []);
	return (
		<div>
			{error ? (
				<div>{error}</div>
			) : (
				<div className="text-muted-foreground ">
					{distance !== null
						? `${distance.toFixed()} km away`
						: "Calculating..."}
				</div>
			)}
		</div>
	);
}
export default DistanceAway;
