import { IconType } from "react-icons/lib";
import { MdCabin } from "react-icons/md";
import {
	MdOutlineVilla,
	MdCottage,
	MdOutlineOtherHouses,
} from "react-icons/md";
import { SiGameloft } from "react-icons/si";
import { FaWarehouse } from "react-icons/fa6";
import { MdOutlineChalet, MdOutlineCastle } from "react-icons/md";
import { LuTent } from "react-icons/lu";

export enum PropertyCategory {
	Cabin = "Cabin",
	Villa = "Villa",
	Cottage = "Cottage",
	Loft = "Loft",
	Farmhouse = "Farmhouse",
	Chalet = "Chalet",
	Castle = "Castle",
	Tent = "Tent",
	Other = "Other",
}

type Category = {
	label: PropertyCategory;
	icon: IconType;
	id: string;
};

export const categories: Category[] = [
	{ label: PropertyCategory.Cabin, icon: MdCabin, id: "10" },
	{ label: PropertyCategory.Villa, icon: MdOutlineVilla, id: "20" },
	{ label: PropertyCategory.Cottage, icon: MdCottage, id: "30" },
	{ label: PropertyCategory.Loft, icon: SiGameloft, id: "40" },
	{ label: PropertyCategory.Farmhouse, icon: FaWarehouse, id: "50" },
	{ label: PropertyCategory.Chalet, icon: MdOutlineChalet, id: "60" },
	{ label: PropertyCategory.Castle, icon: MdOutlineCastle, id: "70" },
	{ label: PropertyCategory.Tent, icon: LuTent, id: "80" },
	{ label: PropertyCategory.Other, icon: MdOutlineOtherHouses, id: "90" },
];
