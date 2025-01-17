import { ExpenseDistributionPieChart } from "@/components/custom/ExpenseDistributionPieChart"
import { ExpenseLineChart } from "@/components/custom/ExpenseLineChart"

const Page = () => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      <ExpenseDistributionPieChart/>
      <ExpenseLineChart />
    </div>
  )
}

export default Page
