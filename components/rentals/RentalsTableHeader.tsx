"use client";
/* import OrderByName from "./OrderByName";
import OrderByPrice from "./OrderByPrice"; */
import { TableRow, TableHead } from "../ui/table";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderBy from "./OrderBy";

export type orderStateType = {
	name: "asc" | "desc" | null;
	price: "asc" | "desc" | null;
};

function RentalsTableHeader() {
	const searchParams = new URLSearchParams(useSearchParams());
	const defaultOrderState = {
		name: searchParams.get("name") as null | "asc" | "desc",
		price: searchParams.get("price") as null | "asc" | "desc",
	};

	const [order, setOrder] = useState<orderStateType>(defaultOrderState);
	return (
		<TableRow>
			<TableHead className="flex items-center gap-x-1">
				<span>Property Name</span>
				{/* 	<OrderByName order={order} setOrder={setOrder} /> */}
				<OrderBy order={order} setOrder={setOrder} mode="name" />
			</TableHead>
			<TableHead>Address</TableHead>
			<TableHead className="flex items-center gap-x-1">
				<span>Price</span>
				{/* <OrderByPrice order={order} setOrder={setOrder} /> */}
				<OrderBy order={order} setOrder={setOrder} mode="price" />
			</TableHead>
			<TableHead>Total Nights</TableHead>
			<TableHead>Total Earning</TableHead>
			<TableHead>Actions</TableHead>
		</TableRow>
	);
}
export default RentalsTableHeader;
