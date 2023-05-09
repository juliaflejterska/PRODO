import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import InfoModal from "../Layout/InfoModal";

interface Category {
  value: string;
  label: string;
}

interface GoalsFormProps {
  title: string;
  placeholder: string;
  buttonText: string;
  onSubmit: (goal: { id: number; text: string; category: string }) => void;
  editGoal?: { id: number | null; text: string };
}

const GoalsForm = (props: GoalsFormProps) => {
  const categories: Category[] = [
    { value: "self-development", label: "self-development" },
    { value: "self-care", label: "self-care" },
    { value: "work/school", label: "work/school" },
    { value: "other", label: "other" },
  ];
  const [input, setInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    categories[0]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCategoryChange = (selectedOption: Category | null) => {
    setSelectedCategory(selectedOption);
  };

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "" || input.length === 0) {
      setShowModal(true);
      return;
    }

    const goal = {
      id: props.editGoal?.id ?? Math.floor(Math.random() * 1000000),
      text: input,
      category: selectedCategory ? selectedCategory.value : "",
    };

    props.onSubmit(goal);

    setInput("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <Form.Group
          className="mb-3"
          style={{ width: "325px" }}
          controlId="formBasicName"
        >
          <Form.Label>Goal's title</Form.Label>
          <Form.Control
            type="text"
            placeholder={props.placeholder}
            name="goal"
            value={input}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          style={{ width: "325px" }}
          controlId="formBasicCategory"
        >
          <Form.Label>Goal's category</Form.Label>
          <Select
            value={selectedCategory}
            options={categories}
            onChange={handleCategoryChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" style={{ width: "325px" }}>
          {props.buttonText}
        </Button>
      </Form>

      <InfoModal
        show={showModal}
        message="Title cannot be empty. Please enter a valid title."
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default GoalsForm;
