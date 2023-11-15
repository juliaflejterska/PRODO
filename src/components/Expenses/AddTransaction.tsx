import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { ExpenseContext } from "../../context/expense-context";
import { Button, Form } from "react-bootstrap";
import InfoModal from "../Layout/InfoModal";

interface Transaction {
  id: number;
  text: string;
  amount: number;
}

const AddTransaction = (): JSX.Element => {
  const { addTransaction } = useContext(ExpenseContext);

  const [text, setText] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Walidacja, czy wprowadzona wartość jest liczbą
    if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      setAmount(inputValue);
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "" || text.length === 0) {
      setModalMessage("Title cannot be empty. Please enter a valid title.");
      setModalShow(true);
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      setModalMessage(
        "Amounts should be positive or negative values. Please enter a valid amount."
      );
      setModalShow(true);
      return;
    }

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 100000),
      text: text,
      amount: Number(amount),
    };

    setAmount("");
    setText("");

    addTransaction(newTransaction);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <Form.Group className="mb-3" style={{ width: "325px" }}>
          <Form.Label>Transaction's title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={text}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: "325px" }}>
          <Form.Label>Positive/Negative amount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            inputMode="numeric"
          />
        </Form.Group>
        <Button variant="dark" type="submit" style={{ width: "325px" }}>
          ADD
        </Button>
      </Form>
      <InfoModal
        show={modalShow}
        message={modalMessage}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default AddTransaction;
