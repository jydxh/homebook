"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { fetchLastSixMonthEarning } from "@/utils/actions/PropertyActions";
import { formatDate } from "@/utils/formatDate";

function ReverseCharts() {
	const defaultChartData = [
		{ month: "January", totalEarning: 186 },
		{ month: "February", totalEarning: 305 },
		{ month: "March", totalEarning: 237 },
		{ month: "April", totalEarning: 73 },
		{ month: "May", totalEarning: 209 },
		{ month: "June", totalEarning: 214 },
	];
	const lengthOfData = 6;
	const [chartData, setChartData] = useState<
		{
			month: string;
			totalEarning: number;
		}[]
	>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchLastSixMonthEarning();
			//console.log(result);

			if (result.length < lengthOfData) {
				const now = new Date();
				// if the fetchedData's length less than the lengthOfData, it means there is no income for certain month, so we need to feed that data like totalEarning = 0
				for (let i = 0; i < lengthOfData; i++) {
					const passedMonth = new Date();
					passedMonth.setMonth(now.getMonth() - lengthOfData + i);
					const passedMonthLiteral = formatDate({
						date: passedMonth,
						withoutDay: true,
					});
					let monthExistsInDataArray = false;
					result.forEach(row => {
						if (row.month === passedMonthLiteral) monthExistsInDataArray = true;
					});
					if (monthExistsInDataArray) {
						continue;
					} else {
						result.push({
							month: passedMonthLiteral,
							totalEarning: 0,
							timeStamp: passedMonth.getTime(),
						});
					}
				}
			}
			const formattedData = result.sort((a, b) => {
				return a.timeStamp - b.timeStamp;
			});
			//	console.log(formattedData);
			setChartData(formattedData);
		};
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

	sixMonthsAgo.setMonth(currentDate.getMonth() - 5);

	const currentDateMonth = currentDate.toLocaleString("default", {
		month: "long",
	});
	const sixMonthsAgoMonth = sixMonthsAgo.toLocaleString("default", {
		month: "long",
	});
	const thisYear = new Date().getFullYear();

	return (
		<Card className="max-w-[720px] mx-auto my-10">
			<CardHeader>
				<CardTitle>Last 6 months income</CardTitle>
				<CardDescription>
					{sixMonthsAgoMonth}{" "}
					{sixMonthsAgo.getMonth() > 5 ? thisYear - 1 : thisYear} -{" "}
					{currentDateMonth} {thisYear}
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
