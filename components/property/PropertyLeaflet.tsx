"use client";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
} from "react-leaflet";

import { icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
const iconUrl =
	"https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = icon({
	iconUrl: iconUrl,
	iconSize: [20, 30],
});

function PropertyLeaflet({
	address,
	latLngString,
}: {
	address: string;
	latLngString: string;
}) {
	const latLngObj = JSON.parse(latLngString) as { lat: number; lng: number };
	const latLngArr = [latLngObj.lat, latLngObj.lng] as LatLngExpression;
	return (
		<div className="mt-8">
			<h3 className="font-semibold text-lg">Location: {address}</h3>
			<MapContainer
				className="mt-4 w-full h-[50vh]"
				center={latLngArr}
				zoom={13}
				scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ZoomControl position="bottomright" />
				<Marker position={latLngArr} icon={markerIcon}>
					<Popup>Address: {address}</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}
export default PropertyLeaflet;
