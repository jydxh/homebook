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
};

export const categories: Category[] = [
	{ label: PropertyCategory.Cabin, icon: MdCabin },
	{ label: PropertyCategory.Villa, icon: MdOutlineVilla },
	{ label: PropertyCategory.Cottage, icon: MdCottage },
	{ label: PropertyCategory.Loft, icon: SiGameloft },
	{ label: PropertyCategory.Farmhouse, icon: FaWarehouse },
	{ label: PropertyCategory.Chalet, icon: MdOutlineChalet },
	{ label: PropertyCategory.Castle, icon: MdOutlineCastle },
	{ label: PropertyCategory.Tent, icon: LuTent },
	{ label: PropertyCategory.Other, icon: MdOutlineOtherHouses },
];
