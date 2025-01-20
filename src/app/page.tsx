import { ExpenseBarChart } from "@/components/custom/ExpenseBarChart";
import { ExpenseDistributionPieChart } from "@/components/custom/ExpenseDistributionPieChart";
import { ExpenseLineChart } from "@/components/custom/ExpenseLineChart";
import { IncomeDistributionPieChart } from "@/components/custom/IncomeDistributionPieChart";

const Page = () => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      <IncomeDistributionPieChart />
      <ExpenseDistributionPieChart />
      <ExpenseBarChart />
      <ExpenseLineChart />
    </div>
  );
};

export default Page;
