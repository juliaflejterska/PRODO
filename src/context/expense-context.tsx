import { createContext, useReducer, ReactNode } from "react";
import { DUMMY_TRANSACTIONS } from "../constans";

type Transaction = {
  id: number;
  text: string;
  amount: number;
};

type ExpenseState = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
};

type ExpenseAction =
  | { type: "ADD"; payload: Transaction }
  | { type: "DELETE"; payload: number };

const initialState: ExpenseState = {
  transactions: [...DUMMY_TRANSACTIONS],
  addTransaction: () => {},
  deleteTransaction: () => {},
};

const expenseReducer = (state: ExpenseState, action: ExpenseAction) => {
  switch (action.type) {
    case "ADD":
      localStorage.setItem(
        "transactions",
        JSON.stringify([action.payload, ...state.transactions])
      );
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "DELETE":
      localStorage.setItem(
        "transactions",
        JSON.stringify(
          state.transactions.filter(
            (transaction) => transaction.id !== action.payload
          )
        )
      );
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const ExpenseContext = createContext<ExpenseState>(initialState);

type ExpenseContextProviderProps = {
  children: ReactNode;
};

export const ExpenseContextProvider = ({
  children,
}: ExpenseContextProviderProps) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const addTransaction = (transaction: Transaction) => {
    dispatch({
      type: "ADD",
      payload: transaction,
    });
  };

  const deleteTransaction = (id: number) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  const contextValue: ExpenseState = {
    transactions: state.transactions,
    addTransaction,
    deleteTransaction,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};
