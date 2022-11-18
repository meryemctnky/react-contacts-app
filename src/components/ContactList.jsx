import React, { useContext, useState, useEffect } from "react";
import { FaPlusCircle, FaUser } from "react-icons/fa";
import { Button, Modal, Alert } from "react-bootstrap";
import { ContactContext } from "../contexts/ContactContext";
import Contact from "./Contact";
import AddForm from "./AddForm";
import MyPagination from "./MyPagination";
import Loading from "./Loading";
import NotFound from "./NotFound";

const ContactList = () => {
  const { sortedContacts } = useContext(ContactContext);
  const { loading } = useContext(ContactContext);

  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactPerPage] = useState(6);

  /* ============ MODAL AND ALERT FUNCTIONS =========== */
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      handleShowAlert();
    };
  }, [sortedContacts]);

  /* ============ PAGINATION =========== */
  const indexOfLastContact = currentPage * contactPerPage;
  const indexOfFirstContact = indexOfLastContact - contactPerPage;
  const currentContact = sortedContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPagesNum = Math.ceil(sortedContacts.length / contactPerPage);

  /* ============ CONTACT FILTERING =========== */
  const filtered = currentContact.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <section className="container-xl contact-list py-4">
        <div className="mask-custom card mb-3">
          <div class="card-body">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row text-white">
                    {/* TITLE */}
                    <div className="col-sm-6">
                      <ul className="list-group list-group-horizontal">
                        <li className="list-group-item bg-transparent border-0 pe-2 text-white">
                          <FaUser style={{ fontSize: "23" }} />
                        </li>
                        <li className="list-group-item bg-transparent border-0 me-auto px-0 text-white">
                          <h4>Contact List</h4>
                        </li>
                      </ul>
                    </div>
                    {/* ADD CONTACT AND SEARCH */}
                    <div className="col-sm-6">
                      <ul className="list-group list-group-horizontal float-end">
                        {/* SEARCH */}
                        <li className="me-2">
                          <input
                            className="form-control search"
                            type="text"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            placeholder="Search"
                          />
                        </li>
                        {/* ADD CONTACT */}
                        <li>
                          <Button className="btn success-button btn-group"onClick={handleShow}>
                            <FaPlusCircle className="me-2 mt-1" />
                            <span>Add New</span>
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* SHOW ALERT */}
              <Alert show={showAlert} variant="success">Your changes have been successfully saved!</Alert>

              {/* CONTACT LIST TABLE */}
              {loading ? (
                <Loading />
              ) : sortedContacts.length > 0 ? (
                <table className="table border-secondary">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                      <th scope="col">Company</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((contact) => (
                      <tr key={contact.id}>
                        <Contact contact={contact} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <NotFound />
              )}
            </div>

            {/* PAGINATION */}
            <MyPagination pages={totalPagesNum} setCurrentPage={setCurrentPage} contactPerPage={contactPerPage}/>

            {/* ADD CONTACT MODAL */}
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="title">Add Contact</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddForm />
              </Modal.Body>
            </Modal>
          </div>
        </div>
    </section>
  );
};

export default ContactList;
