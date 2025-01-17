"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  const allDatesAmount: ExpenseMap = {};
  const currDate = new Date().getDate();
  for (let i = 1; i <= currDate; i++)
    allDatesAmount[new Date(2025, 0, i).toDateString()] = 0;

  const summarizedData = Object.entries(
    transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, { date, amount }) => {
        acc[new Date(date).toDateString()] += amount;
        return acc;
      }, allDatesAmount)
  ).map(([date, amount]) => ({
    name: Number(date.split(" ")[2]),
    value: Math.abs(amount),
  }));

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Expenses per day</CardTitle>
        <CardDescription>January 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            accessibilityLayer
            data={summarizedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
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