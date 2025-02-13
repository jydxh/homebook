"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
	generateDisabledDates,
	generateDateRange,
	defaultSelected,
	generateBlockedPeriods,
} from "@/utils/calendar";
import { Booking } from "@/utils/types";

export type BookingState = {
	propertyId: string;
	bookings: Booking[];
	range: undefined | DateRange;
};

function DatePicker({
	className,
	bookState,
	setBookingState,
}: {
	className: string | undefined;
	bookState: {
		propertyId: string;
		bookings: Booking[];
		range: undefined | DateRange;
	};
	setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
}) {
	const [range, setRange] = React.useState<DateRange | undefined>(
		defaultSelected
	);
	const { toast } = useToast();
	const blockedPeriods = generateBlockedPeriods({
		bookings: bookState.bookings,
		today: new Date(),
	});

	const unavailableDates = generateDisabledDates(blockedPeriods);

	React.useEffect(() => {
		// this is to convert the dateRange into like this['2025-02-09','...']
		const selectedRange = generateDateRange(range);
		const isDisabledDateIncluded = selectedRange.some(date => {
			//if selectedRange has any item is the unavailableDate, it will return true, and clear the selected ui and show the toast info
			if (unavailableDates[date]) {
				setRange(defaultSelected); //clear the selected ui
				toast({ description: "Some dates are booked. Please select again" });
				return true;
			}

			return false;
		});

		// only if it not include the disabled date will update the range at the state
		if (!isDisabledDateIncluded) {
			setBookingState(prev => {
				return { ...prev, range };
			});
		}
	}, [range]);

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!range && "text-muted-foreground"
						)}>
						<CalendarIcon />
						{range?.from ? (
							range.to ? (
								<>
									{format(range.from, "LLL dd, y")} -{" "}
									{format(range.to, "LLL dd, y")}
								</>
							) : (
								format(range.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 z-100" align="center">
					<Calendar
						initialFocus
						min={2} // this props is to prevent user select the same date as check_in and check_out
						mode="range"
						selected={range}
						onSelect={setRange}
						numberOfMonths={1}
						disabled={blockedPeriods}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
export default DatePicker;
