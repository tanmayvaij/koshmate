import { ExpenseBarChart } from "@/components/custom/ExpenseBarChart";
import { ExpenseDistributionPieChart } from "@/components/custom/ExpenseDistributionPieChart";
import { ExpenseLineChart } from "@/components/custom/ExpenseLineChart";
import { IncomeDistributionPieChart } from "@/components/custom/IncomeDistributionPieChart";
import { Transactions } from "@/components/custom/Transactions";

const Page = () => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <IncomeDistributionPieChart />
      <ExpenseDistributionPieChart />
      <ExpenseBarChart />
      <div className="col-span-3">
        <ExpenseLineChart />
      </div>
      <div className="col-span-3">
        <Transactions />
      </div>
    </div>
  );
};

export default Page;
