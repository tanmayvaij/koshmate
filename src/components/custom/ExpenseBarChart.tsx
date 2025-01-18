"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export function ExpenseBarChart() {
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
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={summarizedData}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹ ${value}`}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="tomato" radius={5} />
          </BarChart>
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
