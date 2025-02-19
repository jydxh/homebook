"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";
import { fetchLastSixMonthEarning } from "@/utils/actions/PropertyActions";

function ReverseCharts() {
	const chartData = [
		{ month: "January", totalEarning: 186 },
		{ month: "February", totalEarning: 305 },
		{ month: "March", totalEarning: 237 },
		{ month: "April", totalEarning: 73 },
		{ month: "May", totalEarning: 209 },
		{ month: "June", totalEarning: 214 },
	];

	useEffect(() => {
		const fetchData = async () => await fetchLastSixMonthEarning();
		fetchData();
	}, []);

	const chartConfig = {
		totalEarning: {
			label: "Total Earning",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;
	const currentDate = new Date();
	const sixMonthsAgo = new Date();
	const lastMonthAgo = new Date();
	lastMonthAgo.setMonth(currentDate.getMonth() - 1);
	sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
	console.log(sixMonthsAgo.getMonth());

	const lastMonthAgoMonth = lastMonthAgo.toLocaleString("default", {
		month: "long",
	});
	const sixMonthsAgoMonth = sixMonthsAgo.toLocaleString("default", {
		month: "long",
	});
	const thisYear = new Date().getFullYear();
	console.log(lastMonthAgoMonth);
	console.log(sixMonthsAgoMonth);

	return (
		<Card className="max-w-[720px] mx-auto my-10">
			<CardHeader>
				<CardTitle>Last 6 months income</CardTitle>
				<CardDescription>
					{sixMonthsAgoMonth}{" "}
					{sixMonthsAgo.getMonth() > 5 ? thisYear - 1 : thisYear} -{" "}
					{lastMonthAgoMonth} {thisYear}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={value => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							dataKey="totalEarning"
							fill="var(--color-totalEarning)"
							radius={8}>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
export default ReverseCharts;
