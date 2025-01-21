"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

const COLORS = ["dodgerblue", "tomato", "orange", "green", "indigo", "black"];

export const ExpenseDistributionPieChart = () => {
  const totalExpense = React.useMemo(() => {
    return Math.abs(
      transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, curr) => acc + curr.amount, 0)
    );
  }, []);

  const summarizedData = Object.entries(
    transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, { type, amount }) => {
        if (!acc[type]) acc[type] = 0;
        acc[type] += amount;
        return acc;
      }, {} as ExpenseMap)
  ).map(([type, amount], id) => ({
    name: type,
    value: (Math.abs(amount) / totalExpense) * 100,
    fill: COLORS[id],
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses % by Category</CardTitle>
        <CardDescription>January 2025</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{}} className="min-h-[350px] w-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={summarizedData}
              dataKey="value"
              nameKey="name"
              innerRadius={100}
              strokeWidth={5}
              label={({ name, value }) =>
                `${name} ( ${value.toLocaleString().slice(0, 5)} % )`
              }
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          ₹ {totalExpense.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Expense
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};
