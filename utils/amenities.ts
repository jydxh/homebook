import {
	FaWifi,
	FaSwimmingPool,
	FaParking,
	FaTv,
	FaUtensils,
	FaDumbbell,
	FaSpa,
	FaConciergeBell,
	FaCoffee,
	FaShower,
	FaBath,
	FaSnowflake,
	FaFire,
	FaBicycle,
	FaDog,
	FaGamepad,
	FaTree,
	FaMusic,
	FaBeer,
	FaChild,
} from "react-icons/fa";

import { type IconType } from "react-icons/lib";
export type Amenity = { name: string; icon: IconType; id: string };

export const amenities = [
	{ name: "WiFi", icon: FaWifi, id: "113" },
	{ name: "Swimming Pool", icon: FaSwimmingPool, id: "107" },
	{ name: "Parking", icon: FaParking, id: "117" },
	{ name: "TV", icon: FaTv, id: "104" },
	{ name: "Kitchen", icon: FaUtensils, id: "119" },
	{ name: "Gym", icon: FaDumbbell, id: "108" },
	{ name: "Spa", icon: FaSpa, id: "106" },
	{ name: "Concierge", icon: FaConciergeBell, id: "112" },
	{ name: "Coffee Maker", icon: FaCoffee, id: "110" },
	{ name: "Shower", icon: FaShower, id: "114" },
	{ name: "Bathtub", icon: FaBath, id: "116" },
	{ name: "Air Conditioning", icon: FaSnowflake, id: "109" },
	{ name: "Heating", icon: FaFire, id: "111" },
	{ name: "Bicycle Rental", icon: FaBicycle, id: "103" },
	{ name: "Pet Friendly", icon: FaDog, id: "120" },
	{ name: "Game Room", icon: FaGamepad, id: "101" },
	{ name: "Garden", icon: FaTree, id: "115" },
	{ name: "Music System", icon: FaMusic, id: "118" },
	{ name: "Bar", icon: FaBeer, id: "102" },
	{ name: "Playground", icon: FaChild, id: "105" },
];

export const amenitiesIds = amenities.map(item => item.id);
