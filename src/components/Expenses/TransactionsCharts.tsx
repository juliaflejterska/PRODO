import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { ExpenseContext } from "../../context/expense-context";

const TransactionsCharts: React.FC = () => {
  const { transactions } = useContext(ExpenseContext);
  return (
    <div style={{ maxWidth: "500px", width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={transactions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="text" hide />
          <YAxis tickCount={8} />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="amount">
            {transactions.map((transaction, index) => (
              <Cell
                key={`cell-${index}`}
                fill={transaction.amount > 0 ? "#136f63" : "#d00000"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsCharts;
