import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { ExpenseContext } from "../../context/expense-context";
import Transaction from "./Transaction";
import { Button } from "react-bootstrap";

const Transactions: React.FC = () => {
  const { transactions } = useContext(ExpenseContext);

  const [alphIsClicked, setAlphIsClicked] = useState(false);
  const [ascIsClicked, setAscIsClicked] = useState(false);
  const [descIsClicked, setDescIsClicked] = useState(false);

  const [pageNum, setPageNum] = useState<number>(0);
  const transPerPage: number = 5;
  const pagesVisited: number = pageNum * transPerPage;
  const pageCount: number = Math.ceil(transactions.length / transPerPage);

  const alphClickHandler = (): void => {
    setAscIsClicked(false);
    setDescIsClicked(false);
    setAlphIsClicked(true);
  };

  const ascClickHandler = (): void => {
    setAlphIsClicked(false);
    setDescIsClicked(false);
    setAscIsClicked(true);
  };

  const descClickHandler = (): void => {
    setAlphIsClicked(false);
    setAscIsClicked(false);
    setDescIsClicked(true);
  };

  if (alphIsClicked) {
    transactions.sort((x, y) => x.text.localeCompare(y.text));
  }

  if (ascIsClicked) {
    transactions.sort((x, y) =>
      x.amount > y.amount ? 1 : y.amount > x.amount ? -1 : 0
    );
  }

  if (descIsClicked) {
    transactions.sort((x, y) =>
      x.amount > y.amount ? -1 : y.amount > x.amount ? 1 : 0
    );
  }

  const changePage = ({ selected }: { selected: number }): void => {
    setPageNum(selected);
  };

  const displayTransactions = transactions
    .slice(pagesVisited, pagesVisited + transPerPage)
    .map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));

  return (
    <>
      <div className="mb-3 d-flex flex-row gap-1">
        <Button variant="dark" onClick={alphClickHandler}>
          SORT ALPH
        </Button>
        <Button variant="dark" onClick={ascClickHandler}>
          SORT ASC
        </Button>
        <Button variant="dark" onClick={descClickHandler}>
          SORT DESC
        </Button>
      </div>
      {displayTransactions}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        pageClassName={"pagination-item"}
        activeClassName={"pagination-active"}
        nextClassName={"pagination-button"}
        previousClassName={"pagination-button"}
        pageRangeDisplayed={3}
      />
    </>
  );
};

export default Transactions;
