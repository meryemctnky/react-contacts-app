import React, { useContext, useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import { ContactContext } from "../contexts/ContactContext";
import EditForm from "./EditForm";

const Contact = ({ contact }) => {
  const { removeContact } = useContext(ContactContext);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [contact]);

  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );

  const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );

  return (
    <>
      <td>{contact.name}</td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>{contact.company}</td>
      <td>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={editTooltip}
        >
          <button
            type="button"
            className="btn text-warning"
            onClick={handleShow}
          >
            <FaEdit />
          </button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={deleteTooltip}
        >
          <button
            type="button"
            className="btn text-danger"
            onClick={() => removeContact(contact.id)}
          >
            <FaTrash />
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title">Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm contact={contact} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Contact;
