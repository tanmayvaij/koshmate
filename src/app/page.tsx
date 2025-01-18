import { ExpenseBarChart } from "@/components/custom/ExpenseBarChart"
import { ExpenseDistributionPieChart } from "@/components/custom/ExpenseDistributionPieChart"
import { ExpenseLineChart } from "@/components/custom/ExpenseLineChart"

const Page = () => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      <ExpenseDistributionPieChart/>
      <ExpenseBarChart />
      <ExpenseLineChart />
    </div>
  )
}

export default Page
