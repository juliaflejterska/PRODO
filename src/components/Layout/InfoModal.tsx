import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  message: string;
  handleClose: () => void;
}

const InfoModal: React.FC<ModalProps> = ({ show, message, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Attention</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
