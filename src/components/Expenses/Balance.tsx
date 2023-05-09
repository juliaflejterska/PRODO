import { useContext } from "react";
import { ExpenseContext } from "../../context/expense-context";

interface Transaction {
  amount: number;
}

const Balance = (): JSX.Element => {
  const { transactions } = useContext(ExpenseContext);

  const amounts: number[] = transactions.map(
    (transaction: Transaction) => transaction.amount
  );

  const total: string = amounts
    .reduce((acc: number, item: number) => (acc += item), 0)
    .toFixed(2);

  const income: string = amounts
    .filter((item: number) => item > 0)
    .reduce((acc: number, item: number) => (acc += item), 0)
    .toFixed(2);

  const expense: string = (
    amounts
      .filter((item: number) => item < 0)
      .reduce((acc: number, item: number) => (acc += item), 0) * -1
  ).toFixed(2);

  return (
    <div
      className="d-flex justify-content-around align-items-center text-center gap-3"
      style={{ fontSize: "20px", fontWeight: "600" }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <span>BALANCE</span>
        <span>${total}</span>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <span>INCOME</span>
        <span style={{ color: "#136f63" }}>${income}</span>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center text-center">
        <span>EXPENSE</span>
        <span style={{ color: "#d00000" }}>-${expense}</span>
      </div>
    </div>
  );
};

export default Balance;
