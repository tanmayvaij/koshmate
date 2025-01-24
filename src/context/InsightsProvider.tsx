import { transactions } from "@/data";
import { createContext, useContext } from "react";

const Context = createContext<{
  totalIncome: number;
  totalExpense: number;
  summarizedData: { name: number; value: number }[];
  lineData: { name: number; value: number }[];
}>({
  totalIncome: 0,
  totalExpense: 0,
  lineData: [],
  summarizedData: [],
});

// income 
const totalIncome = transactions
  .filter((transaction) => transaction.amount > 0)
  .reduce((acc, curr) => acc + curr.amount, 0);

// expense
const totalExpense = Math.abs(
  transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0)
);

// bar chart data
const allDatesAmount: ExpenseMap = {};
const currDate = new Date().getDate();
for (let i = 1; i <= currDate; i++)
  allDatesAmount[new Date(2025, 0, i).toDateString()] = 0;

const summarizedData = Object.entries(
  transactions.reduce((acc, { date, amount }) => {
    acc[new Date(date).toDateString()] += amount;
    return acc;
  }, allDatesAmount)
).map(([date, amount]) => ({
  name: Number(date.split(" ")[2]),
  value: amount,
}));

// line data 
const lineData: { name: number; value: number }[] = [];
let currAmount = 82342.06;
summarizedData.forEach((transaction) => {
  lineData.push({
    name: transaction.name,
    value: currAmount + transaction.value,
  });
  currAmount += transaction.value;
});

const InsightsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Context.Provider
      value={{ totalIncome, totalExpense, summarizedData, lineData }}
    >
      {children}
    </Context.Provider>
  );
};

export const useInsights = () => useContext(Context);

export default InsightsProvider;
