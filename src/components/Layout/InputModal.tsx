import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface InputModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (title: string) => void;
}

const InputModal: React.FC<InputModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [title, setTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSaveClick = () => {
    handleSave(title);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Event Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={handleInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InputModal;
