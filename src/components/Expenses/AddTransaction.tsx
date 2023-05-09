import { useState, useContext, ChangeEvent, FormEvent } from "react";
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
  const [amount, setAmount] = useState<number>();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
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

    if (!amount) {
      setModalMessage(
        "Amounts should be positive or negative values. Please enter a valid amount."
      );
      setModalShow(true);
      return;
    }

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 100000),
      text: text,
      amount: amount,
    };

    setAmount(undefined);
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
            type="number"
            placeholder="Enter amount"
            value={amount ?? ""}
            onChange={handleAmountChange}
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
