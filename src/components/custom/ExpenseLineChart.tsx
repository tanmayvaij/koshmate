"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { transactions } from "@/data";

export function ExpenseLineChart() {

  const startDate = new Date(2025, 0, 1);
  const currentDate = new Date()
  
  const testAllDatesAmount: ExpenseMap = {}

  while ( startDate < currentDate ) {
    testAllDatesAmount[startDate.toDateString()] = 0
    startDate.setDate(startDate.getDate() + 1)    
  }

  const summarizedData = Object.entries(
    transactions.reduce((acc, { date, amount }) => {
      acc[new Date(date).toDateString()] += amount;
      return acc;
    }, testAllDatesAmount)
  ).map(([date, amount]) => ({
    name: Number(date.split(" ")[2]),
    value: amount,
  }));

  const data: { name: number; value: number }[] = [];
  let currAmount = 82342.06;
  summarizedData.forEach((transaction) => {
    data.push({
      name: transaction.name,
      value: currAmount + transaction.value,
    });

    currAmount += transaction.value;
  });

  return (
    <Card className="col-span-1 ">
      <CardHeader>
        <CardTitle>Expenses per day</CardTitle>
        <CardDescription>January 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              domain={[80000, "dataMax"]}
              tickFormatter={(value) => `₹${value}`}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="tomato"
              strokeWidth={2}
              dot={{
                fill: "tomato",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
