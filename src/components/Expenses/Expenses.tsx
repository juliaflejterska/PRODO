import AddTransaction from "./AddTransaction";
import Balance from "./Balance";
import Transactions from "./Transactions";
import TransactionsCharts from "./TransactionsCharts";
import { ExpenseContextProvider } from "../../context/expense-context";

const Expenses = (): JSX.Element => {
  return (
    <ExpenseContextProvider>
      <>
        <div
          className="mb-5 d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1580637250481-b78db3e6f84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="my-5">EXPENSES</h1>
          <AddTransaction />
        </div>

        <Balance />

        <div className="mb-5 m-5 d-flex flex-column flex-md-row justify-content-around align-items-center text-center">
          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <Transactions />
          </div>
          <TransactionsCharts />
        </div>
      </>
    </ExpenseContextProvider>
  );
};

export default Expenses;
