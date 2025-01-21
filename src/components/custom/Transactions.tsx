import { transactions } from "@/data";

export function Transactions() {
  return (
    <div className="shadow-md rounded-xl border h-[500px] overflow-y-scroll p-5">
      <table className="w-full">
        <thead>
          <tr>
            <td className="border px-2 py-1">Date</td>
            <td className="border px-2 py-1">Message</td>
            <td className="border px-2 py-1">Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, tid) => {
            return (
              <tr key={tid}>
                <td className="border px-2 py-1">{transaction.date}</td>
                <td className="border px-2 py-1">{transaction.message}</td>
                <td className="border px-2 py-1">{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
