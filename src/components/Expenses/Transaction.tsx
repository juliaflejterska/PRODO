import { useContext } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { ExpenseContext } from "../../context/expense-context";

interface TransactionProps {
  transaction: {
    id: number;
    text: string;
    amount: number;
  };
}

const Transaction = ({ transaction }: TransactionProps) => {
  const { deleteTransaction } = useContext(ExpenseContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  const deleteHandler = () => {
    deleteTransaction(transaction.id);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        margin: "5px 0",
        width: "325px",
        backgroundColor: "#fff",
        border: "1px solid #ced4da",
        borderRadius: "0.375rem",
        fontSize: "18px",
        fontWeight: "600",
      }}
    >
      <div>
        <span
          style={{
            color: transaction.amount < 0 ? "#d00000" : "#136f63",
          }}
        >
          {sign}${Math.abs(transaction.amount)}
        </span>
        <RiCloseCircleLine
          onClick={deleteHandler}
          style={{ color: "#d00000", fontSize: "25px", marginLeft: "5px" }}
        />
      </div>
      <div>
        <span>{transaction.text}</span>
      </div>
    </div>
  );
};

export default Transaction;
